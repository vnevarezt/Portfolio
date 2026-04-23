export const BP = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/** @deprecated use BP instead */
export const BREAKPOINTS = {
  mobile: 768,
} as const;

export const Z_INDEX = {
  sidebar: 10,
  stickyHeader: 5,
  mobileTopBar: 20,
  mobileBottomNav: 20,
} as const;

export const ANIMATION = {
  counterDuration: 1400,
  revealThreshold: 0.12,
} as const;
