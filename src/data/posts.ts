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
      'What I learned from rolling my own 2FA for vnevarezt, including the embarrassing first iteration.',
    hue: 45,
  },
];
