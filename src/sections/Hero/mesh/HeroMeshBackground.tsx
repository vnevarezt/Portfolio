import { useEffect, useRef } from 'react';
import type { HeroMeshQuality, HeroPointerState } from './heroMesh.types';
import {
  HERO_MESH_DEVICE_BUDGET,
  HERO_MESH_FPS_BUDGET,
  HERO_MESH_LIGHT_MOBILE_MULTIPLIER,
  HERO_MESH_PRESET,
  HERO_MESH_PROFILES,
  HERO_MESH_VISUAL_PRESETS,
} from './heroMesh.constants';
import { useHeroMeshSettings } from './hooks/useHeroMeshSettings';
import { clamp, radialFalloff, vectorLength } from './utils/heroMeshMath';

const QUALITY_ORDER: HeroMeshQuality[] = ['high', 'medium', 'low'];

interface MeshParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
  radius: number;
  strength: number;
  massWeight: number;
  renderSize: number;
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randomIntInRange(min: number, max: number): number {
  return Math.floor(randomInRange(min, max + 1));
}

function nextQuality(current: HeroMeshQuality): HeroMeshQuality {
  const index = QUALITY_ORDER.indexOf(current);
  return QUALITY_ORDER[Math.min(QUALITY_ORDER.length - 1, index + 1)];
}

function previousQuality(current: HeroMeshQuality): HeroMeshQuality {
  const index = QUALITY_ORDER.indexOf(current);
  return QUALITY_ORDER[Math.max(0, index - 1)];
}

function readColor(token: '--ac' | '--br', fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return value || fallback;
}

export function HeroMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const settings = useHeroMeshSettings();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const pointer: HeroPointerState = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      active: false,
    };

    let width = 0;
    let height = 0;
    let quality = settings.quality;
    const visual = HERO_MESH_VISUAL_PRESETS[HERO_MESH_PRESET];
    const qualityScale = settings.mode === 'light' ? HERO_MESH_LIGHT_MOBILE_MULTIPLIER : 1;

    const getProfile = (currentQuality: HeroMeshQuality) => {
      const profileBase = HERO_MESH_PROFILES[currentQuality];

      // Viewport-proportional spacing: anchored at 1024px reference width.
      // Smaller viewports get tighter cells so the grid keeps a consistent
      // visual density across desktop, tablet and mobile.
      const viewportScale = width > 0 ? clamp(width / 1024, 0.55, 1.3) : 1;
      const spacing = Math.max(22, Math.round(profileBase.spacing * viewportScale));

      return {
        spacing,
        maxFps: Math.round(profileBase.maxFps * qualityScale),
        pointerRadius: profileBase.pointerRadius * qualityScale,
        pointerStrength: profileBase.pointerStrength * qualityScale * visual.pointerStrengthMultiplier,
        waveStrength: profileBase.waveStrength * qualityScale * visual.waveStrengthMultiplier,
        alpha: clamp(profileBase.alpha * visual.alphaMultiplier, 0.12, 0.7),
      };
    };

    let profile = getProfile(quality);

    let rafId = 0;
    let frameSample = 0;
    let frameTimeSum = 0;
    let prevNow = performance.now();
    let acc = 0;

    let isHidden = document.hidden;
    // Paused while the hero is scrolled out of view (parallels the tab-hidden
    // pause below) so the animation loop never runs off-screen.
    let isOffscreen = false;
    let particles: MeshParticle[] = [];

    const backgroundStroke = 'rgb(255 255 255 / 0.40)';
    const accentStroke = readColor('--ac', '#a4ff4a');

    const particleCountRange = () => {
      if (settings.mode === 'static') return 0;

      const areaFactor = clamp((width * height) / (1366 * 768), 0.72, 1.38);

      let min = 0;
      let max = 0;

      if (settings.mode === 'light') {
        min = 6;
        max = 10;
      } else if (quality === 'low') {
        min = 8;
        max = 12;
      } else if (quality === 'medium') {
        min = 12;
        max = 18;
      } else {
        min = 16;
        max = 24;
      }

      if (settings.lowPowerDevice) {
        min = Math.max(5, Math.round(min * 0.7));
        max = Math.max(min + 1, Math.round(max * 0.72));
      }

      min = Math.max(2, Math.round(min * areaFactor));
      max = Math.max(min + 1, Math.round(max * areaFactor));

      return randomIntInRange(min, max);
    };

    const getDistributedSpawnPoints = (count: number) => {
      if (count <= 0) return [] as Array<{ x: number; y: number }>;

      const safeWidth = Math.max(1, width);
      const safeHeight = Math.max(1, height);
      const aspect = safeWidth / safeHeight;

      const cols = Math.max(1, Math.ceil(Math.sqrt(count * aspect)));
      const rows = Math.max(1, Math.ceil(count / cols));

      const cellWidth = safeWidth / cols;
      const cellHeight = safeHeight / rows;
      const jitterX = cellWidth * 0.38;
      const jitterY = cellHeight * 0.38;

      const points: Array<{ x: number; y: number }> = [];

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          if (points.length >= count) break;

          const centerX = (col + 0.5) * cellWidth;
          const centerY = (row + 0.5) * cellHeight;

          points.push({
            x: clamp(centerX + randomInRange(-jitterX, jitterX), 0, safeWidth),
            y: clamp(centerY + randomInRange(-jitterY, jitterY), 0, safeHeight),
          });
        }
      }

      for (let index = points.length - 1; index > 0; index -= 1) {
        const swapIndex = randomIntInRange(0, index);
        const temp = points[index];
        points[index] = points[swapIndex];
        points[swapIndex] = temp;
      }

      return points;
    };

    const createParticles = () => {
      const count = particleCountRange();
      const spawnPoints = getDistributedSpawnPoints(count);

      particles = Array.from({ length: count }, (_, index) => {
        const seed = Math.random() * 1000 + index * 37;
        const radiusFactor = randomInRange(0.52, 0.94);
        const strengthFactor = randomInRange(0.34, 0.82);
        const massWeight = randomInRange(0.65, 1.55);
        const renderSize = randomInRange(
          settings.mode === 'light' ? 1.2 : 1.4,
          settings.mode === 'light' ? 2.6 : 3.4,
        );
        const spawn = spawnPoints[index] ?? { x: Math.random() * width, y: Math.random() * height };

        return {
          x: spawn.x,
          y: spawn.y,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.8,
          seed,
          radius: profile.pointerRadius * radiusFactor * 0.92,
          strength: profile.pointerStrength * strengthFactor * 0.9,
          massWeight,
          renderSize,
        };
      });
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      profile = getProfile(quality);

      const dpr = clamp(window.devicePixelRatio || 1, 1, HERO_MESH_DEVICE_BUDGET.maxDevicePixelRatio);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      createParticles();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (settings.mode !== 'interactive') return;

      const rect = host.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pointer.active = false;
        return;
      }

      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden) {
        prevNow = performance.now();
      }
    };

    const updateParticles = (time: number, delta: number) => {
      if (particles.length === 0) return;

      const step = clamp(delta / 16.67, 0.65, 1.3);
      const margin = profile.spacing * 0.5;

      for (const particle of particles) {
        const targetVX = Math.sin(time * 0.00022 + particle.seed) * 0.58;
        const targetVY = Math.cos(time * 0.00019 + particle.seed * 0.8) * 0.52;

        particle.vx += (targetVX - particle.vx) * 0.042 * step;
        particle.vy += (targetVY - particle.vy) * 0.042 * step;

        particle.x += particle.vx * step;
        particle.y += particle.vy * step;

        if (particle.x < -margin) particle.x = width + margin;
        if (particle.x > width + margin) particle.x = -margin;
        if (particle.y < -margin) particle.y = height + margin;
        if (particle.y > height + margin) particle.y = -margin;
      }
    };

    const draw = (time: number, delta: number) => {
      if (particles.length === 0 && width > 0 && height > 0) {
        createParticles();
      }

      updateParticles(time, delta);
      context.clearRect(0, 0, width, height);

      const spacing = Math.max(12, profile.spacing);
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      const interactionWeight = pointer.active && settings.mode === 'interactive' ? 1 : 0;
      const sourceX = pointer.x;
      const sourceY = pointer.y;

      const deformPoint = (x: number, y: number) => {
        let deformedX = x;
        let deformedY = y;

        if (interactionWeight > 0) {
          const dx = x - sourceX;
          const dy = y - sourceY;
          const dist = vectorLength(dx, dy);
          const falloff = radialFalloff(dist, profile.pointerRadius);

          if (falloff > 0) {
            const sink = falloff * profile.pointerStrength;
            const normX = dist > 0.001 ? dx / dist : 0;
            const normY = dist > 0.001 ? dy / dist : 0;

            deformedX -= normX * sink * 0.55;
            deformedY += -normY * sink * 0.35 + sink * 0.95;
          }
        }

        if (particles.length === 0) {
          return { x: deformedX, y: deformedY };
        }

        for (const particle of particles) {
          const dx = x - particle.x;
          const dy = y - particle.y;
          const dist = vectorLength(dx, dy);
          const falloff = radialFalloff(dist, particle.radius);

          if (falloff <= 0) continue;

          const sink = falloff * particle.strength * particle.massWeight;
          const normX = dist > 0.001 ? dx / dist : 0;
          const normY = dist > 0.001 ? dy / dist : 0;

          deformedX -= normX * sink * 0.46;
          deformedY += -normY * sink * 0.28 + sink * 0.72;
        }

        return {
          x: deformedX,
          y: deformedY,
        };
      };

      context.lineWidth = 1;

      for (let row = 0; row < rows; row += 1) {
        context.beginPath();
        for (let col = 0; col < cols; col += 1) {
          const x = col * spacing;
          const y = row * spacing;
          const point = deformPoint(x, y);

          if (col === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.strokeStyle = backgroundStroke;
        context.globalAlpha = profile.alpha;
        context.stroke();
      }

      for (let col = 0; col < cols; col += 1) {
        context.beginPath();
        for (let row = 0; row < rows; row += 1) {
          const x = col * spacing;
          const y = row * spacing;
          const point = deformPoint(x, y);

          if (row === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.strokeStyle = backgroundStroke;
        context.globalAlpha = profile.alpha;
        context.stroke();
      }

      if (settings.mode !== 'static' && pointer.active) {
        context.beginPath();
        context.arc(sourceX, sourceY, settings.mode === 'interactive' ? 2.2 : 1.8, 0, Math.PI * 2);
        context.fillStyle = accentStroke;
        context.globalAlpha =
          settings.mode === 'interactive' ? visual.dotAlphaInteractive : visual.dotAlphaLight;
        context.fill();
      }

      if (settings.mode !== 'static' && particles.length > 0) {
        for (const particle of particles) {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.renderSize, 0, Math.PI * 2);
          context.fillStyle = accentStroke;
          context.globalAlpha =
            (settings.mode === 'interactive' ? 0.28 : 0.22) * clamp(particle.massWeight * 0.74, 0.55, 1);
          context.fill();
        }
      }

      context.globalAlpha = 1;
    };

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      if (isHidden || isOffscreen) return;

      const delta = now - prevNow;
      prevNow = now;

      const targetFrame = 1000 / profile.maxFps;

      acc += delta;
      if (acc < targetFrame) return;

      acc = acc % targetFrame;
      draw(now, delta);

      frameSample += 1;
      frameTimeSum += delta;

      if (frameSample >= HERO_MESH_FPS_BUDGET.sampleFrames && settings.mode !== 'static') {
        const avg = frameTimeSum / frameSample;

        if (avg > HERO_MESH_FPS_BUDGET.degradeMs) {
          const next = nextQuality(quality);
          if (next !== quality) {
            quality = next;
            profile = getProfile(quality);
            createParticles();
          }
        } else if (avg < HERO_MESH_FPS_BUDGET.upgradeMs && !settings.lowPowerDevice) {
          const next = previousQuality(quality);
          if (next !== quality) {
            quality = next;
            profile = getProfile(quality);
            createParticles();
          }
        }

        frameSample = 0;
        frameTimeSum = 0;
      }
    };

    const observer = new ResizeObserver(() => resize());
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isOffscreen = !entries[0]?.isIntersecting;
        if (!isOffscreen) prevNow = performance.now();
      },
      { threshold: 0 },
    );

    resize();
    createParticles();
    observer.observe(host);
    visibilityObserver.observe(host);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [settings.mode, settings.quality, settings.lowPowerDevice]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', opacity: 0.92 }} />
    </div>
  );
}
