export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

export function radialFalloff(distance: number, radius: number): number {
  if (distance >= radius) return 0;
  const normalized = 1 - distance / radius;
  return normalized * normalized;
}

export function vectorLength(x: number, y: number): number {
  return Math.hypot(x, y);
}
