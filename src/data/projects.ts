import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    title: 'VicentCodes Platform',
    cat: 'Full-stack',
    year: '2024',
    desc: 'Personal blog + portfolio with 2FA auth, rich editor, Firebase storage.',
    stack: ['Node', 'Express', 'MongoDB'],
    mark: 'vc',
    featured: true,
  },
  {
    title: 'Lumen Notes',
    cat: 'Android',
    year: '2023',
    desc: 'Material-You note app with voice capture and offline-first sync.',
    stack: ['Kotlin', 'Jetpack Compose'],
    mark: 'lumen',
  },
];

export const PROJECT_CATEGORIES = ['All', 'Web', 'Android', 'Desktop'] as const;
