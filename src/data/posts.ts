import type { Post } from '@/types';

export const POSTS: Post[] = [
  {
    title: "Designing auth that users don't hate",
    date: 'Mar 2026',
    read: '6 min',
    cat: 'UX',
    mark: 'auth',
    excerpt:
      'Why the default Sign In screen feels like customs control — and three small changes that make users smile instead of sigh.',
    hue: 130,
  },
  {
    title: "My 2FA implementation: what I'd change",
    date: 'Feb 2026',
    read: '9 min',
    cat: 'Backend',
    mark: '2fa',
    excerpt:
      'What I learned from rolling my own 2FA for VicentCodes, including the embarrassing first iteration.',
    hue: 45,
  },
  {
    title: 'Android, Compose and the patience of learning',
    date: 'Dec 2025',
    read: '4 min',
    cat: 'Mobile',
    mark: 'android',
    excerpt:
      'Compose taught me that patience, not cleverness, is the skill that actually ships apps.',
    hue: 200,
  },
  {
    title: 'OKLCH is the color space I want to live in',
    date: 'Nov 2025',
    read: '7 min',
    cat: 'CSS',
    mark: 'oklch',
    excerpt:
      'OKLCH is a color space I want to live in: perceptually uniform, accessible by default, and a joy to interpolate.',
    hue: 310,
  },
];
