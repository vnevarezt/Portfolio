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
  {
    title: 'Tinta Editorial',
    cat: 'Web',
    year: '2023',
    desc: 'Editorial website for an indie magazine. Typography-led.',
    stack: ['Astro', 'CSS'],
    mark: 'tinta',
  },
  {
    title: 'DeskClock Pro',
    cat: 'Desktop',
    year: '2022',
    desc: 'Cross-platform focus app. Pomodoro presets, themes.',
    stack: ['Electron', 'React'],
    mark: 'desk',
  },
  {
    title: 'Palette Studio',
    cat: 'Web',
    year: '2024',
    desc: 'OKLCH color palette generator. Export to CSS / Figma.',
    stack: ['React'],
    mark: 'pal',
  },
  {
    title: 'Kaito CLI',
    cat: 'Desktop',
    year: '2023',
    desc: 'Terminal assistant for project scaffolding. Rust-fast.',
    stack: ['Rust'],
    mark: 'kaito',
  },
];

export const PROJECT_CATEGORIES = ['All', 'Web', 'Android', 'Desktop'] as const;
