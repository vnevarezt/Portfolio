import type {
  HeroMeshProfile,
  HeroMeshQuality,
  HeroMeshVisualPreset,
  HeroMeshVisualProfile,
} from './heroMesh.types';

export const HERO_MESH_PRESET: HeroMeshVisualPreset = 'subtle';

export const HERO_MESH_VISUAL_PRESETS: Record<HeroMeshVisualPreset, HeroMeshVisualProfile> = {
  subtle: {
    pointerStrengthMultiplier: 0.86,
    waveStrengthMultiplier: 0.88,
    alphaMultiplier: 0.85,
    dotAlphaInteractive: 0.5,
    dotAlphaLight: 0.34,
  },
  bold: {
    pointerStrengthMultiplier: 1.25,
    waveStrengthMultiplier: 1.2,
    alphaMultiplier: 1.08,
    dotAlphaInteractive: 0.68,
    dotAlphaLight: 0.48,
  },
};

export const HERO_MESH_PROFILES: Record<HeroMeshQuality, HeroMeshProfile> = {
  high: {
    spacing: 28,
    maxFps: 60,
    pointerRadius: 190,
    pointerStrength: 24,
    waveStrength: 2.2,
    alpha: 0.26,
  },
  medium: {
    spacing: 38,
    maxFps: 54,
    pointerRadius: 170,
    pointerStrength: 18,
    waveStrength: 1.7,
    alpha: 0.22,
  },
  low: {
    spacing: 46,
    maxFps: 46,
    pointerRadius: 150,
    pointerStrength: 14,
    waveStrength: 1.2,
    alpha: 0.18,
  },
};

export const HERO_MESH_LIGHT_MOBILE_MULTIPLIER = 0.72;

export const HERO_MESH_FPS_BUDGET = {
  degradeMs: 22,
  upgradeMs: 16,
  sampleFrames: 45,
};

export const HERO_MESH_DEVICE_BUDGET = {
  maxDevicePixelRatio: 2,
  lowPowerMaxCores: 4,
  lowPowerMaxMemoryGb: 4,
};
