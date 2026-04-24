import { useMemo } from 'react';
import type { HeroMeshSettings, HeroMeshQuality } from '../heroMesh.types';
import { HERO_MESH_DEVICE_BUDGET } from '../heroMesh.constants';

function hasCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function detectLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  return (
    cores <= HERO_MESH_DEVICE_BUDGET.lowPowerMaxCores ||
    memory <= HERO_MESH_DEVICE_BUDGET.lowPowerMaxMemoryGb
  );
}

function resolveInitialQuality(lowPowerDevice: boolean): HeroMeshQuality {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  if (lowPowerDevice || dpr > 1.8) return 'low';
  if (dpr > 1.35) return 'medium';
  return 'high';
}

export function useHeroMeshSettings(): HeroMeshSettings {
  return useMemo(() => {
    const reducedMotion = prefersReducedMotion();
    const coarse = hasCoarsePointer();
    const lowPower = detectLowPowerDevice();

    // Touch or reduced-motion: light mode keeps particles but skips pointer tracking.
    if (reducedMotion || coarse) {
      return {
        mode: 'light',
        quality: lowPower ? 'low' : 'medium',
        prefersReducedMotion: reducedMotion,
        lowPowerDevice: lowPower,
      };
    }

    return {
      mode: 'interactive',
      quality: resolveInitialQuality(lowPower),
      prefersReducedMotion: reducedMotion,
      lowPowerDevice: lowPower,
    };
  }, []);
}
