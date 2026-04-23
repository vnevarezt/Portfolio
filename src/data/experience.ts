import type { Experience, ExperienceMeta } from '@/types';

export const EXPERIENCE: Experience[] = [
  {
    role: 'Freelance Developer',
    org: 'Self-employed',
    time: '2022 — Now',
    desc: 'Web apps, Android apps and desktop tools. Figma to production, solo.',
  },
  {
    role: 'Full-stack Developer',
    org: 'Side projects · Node / MongoDB',
    time: '2020 — 2022',
    desc: 'Built VicentCodes — blog + portfolio platform with 2FA and live sitemap.',
  },
  {
    role: 'Android Developer',
    org: 'Kotlin · Jetpack Compose',
    time: '2019 — 2020',
    desc: 'Native apps: motion, Material-You theming, and accessibility.',
  },
  {
    role: 'Self-taught Developer',
    org: 'HTML · CSS · JS',
    time: '2018',
    desc: 'First lines of code at 15. Discovered design, never looked back.',
  },
];

export const EXPERIENCE_META: ExperienceMeta[] = [
  { tags: ['Figma', 'React', 'Node', 'Design', 'Delivery'], highlight: 'Independent' },
  { tags: ['Node', 'Express', 'MongoDB', 'Auth', '2FA'], highlight: 'Platform' },
  { tags: ['Kotlin', 'Compose', 'Material You', 'A11y'], highlight: 'Native' },
  { tags: ['HTML', 'CSS', 'JS'], highlight: 'Origin' },
];
