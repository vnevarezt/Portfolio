export type HeroMeshMode = 'interactive' | 'light' | 'static';

export type HeroMeshQuality = 'high' | 'medium' | 'low';

export type HeroMeshVisualPreset = 'subtle' | 'bold';

export interface HeroMeshProfile {
  spacing: number;
  maxFps: number;
  pointerRadius: number;
  pointerStrength: number;
  waveStrength: number;
  alpha: number;
}

export interface HeroMeshVisualProfile {
  pointerStrengthMultiplier: number;
  waveStrengthMultiplier: number;
  alphaMultiplier: number;
  dotAlphaInteractive: number;
  dotAlphaLight: number;
}

export interface HeroMeshSettings {
  mode: HeroMeshMode;
  quality: HeroMeshQuality;
  prefersReducedMotion: boolean;
  lowPowerDevice: boolean;
}

export interface HeroPointerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}
