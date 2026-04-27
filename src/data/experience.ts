import type { Experience, ExperienceMeta } from '@/types';

export const EXPERIENCE: Experience[] = [
  {
    role: 'Full Stack Software Engineer',
    org: 'Grupo Batta · Torreón, Coahuila (On-site)',
    time: 'Oct 2025 — Now',
    desc: 'Developing internal React applications and integrating APIs with AWS services to support business operations, while also contributing to backend services in Node.js and TypeScript.',
  },
  {
    role: 'IT Specialist',
    org: 'Grupo Universal Gas · Saltillo, Coahuila (On-site)',
    time: 'Jul 2024 — Oct 2025',
    desc: 'Worked across IT and software development, including building an online purchase-order system with Node.js and supporting Linux server services for internal operations.',
  },
  {
    role: 'Android Projects (HydroSense / Zoop)',
    org: 'Independent & Academic collaboration',
    time: '2023 — 2024',
    desc: 'Shipped Android applications and real-time data experiences, including HydroSense for environmental sensor visualization and Zoop published on Google Play.',
  },
  {
    role: 'B.Eng. in Computer Engineering',
    org: 'Instituto Tecnológico Superior de la Región de los Llanos',
    time: '2020 — 2025',
    desc: 'Built a solid foundation in software engineering through hands-on projects in mobile, web, and backend development.',
  },
];

export const EXPERIENCE_META: ExperienceMeta[] = [
  { tags: ['Flutter', 'Dart', 'Node.js', 'TypeScript', 'Next.js', 'Firebase', 'SQL'], highlight: 'Now' },
  { tags: ['Node.js', 'Web Admin', 'Linux', 'Operations'], highlight: 'Scale' },
  { tags: ['Android', 'Kotlin', 'Firebase', 'Real-time Data', 'Google Play'], highlight: 'Products' },
  { tags: ['Computer Engineering', 'Software Foundations', 'Applied Projects'], highlight: 'Degree' },
];
