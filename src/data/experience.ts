import type { Experience, ExperienceMeta } from '@/types';
import { useLang } from '@/i18n/useLang';

const EXPERIENCE_EN: Experience[] = [
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

const EXPERIENCE_ES: Experience[] = [
  {
    role: 'Ingeniero de Software Full Stack',
    org: 'Grupo Batta · Torreón, Coahuila (Presencial)',
    time: 'Oct 2025 — Actualidad',
    desc: 'Desarrollo aplicaciones internas en React e integro APIs con servicios de AWS para apoyar la operación del negocio, además de contribuir en servicios de backend con Node.js y TypeScript.',
  },
  {
    role: 'Especialista en TI',
    org: 'Grupo Universal Gas · Saltillo, Coahuila (Presencial)',
    time: 'Jul 2024 — Oct 2025',
    desc: 'Trabajé entre TI y desarrollo de software, incluyendo la creación de un sistema de órdenes de compra en línea con Node.js y el soporte de servicios en servidores Linux para la operación interna.',
  },
  {
    role: 'Proyectos Android (HydroSense / Zoop)',
    org: 'Colaboración independiente y académica',
    time: '2023 — 2024',
    desc: 'Lancé aplicaciones Android y experiencias de datos en tiempo real, incluyendo HydroSense para visualización de sensores ambientales y Zoop, publicada en Google Play.',
  },
  {
    role: 'Ingeniería Informática',
    org: 'Instituto Tecnológico Superior de la Región de los Llanos',
    time: '2020 — 2025',
    desc: 'Construí una base sólida en ingeniería de software mediante proyectos prácticos en desarrollo móvil, web y backend.',
  },
];

const EXPERIENCE_META_EN: ExperienceMeta[] = [
  { tags: ['Flutter', 'Dart', 'Node.js', 'TypeScript', 'Next.js', 'Firebase', 'SQL'], highlight: 'Now' },
  { tags: ['Node.js', 'Web Admin', 'Linux', 'Operations'], highlight: 'Scale' },
  { tags: ['Android', 'Kotlin', 'Firebase', 'Real-time Data', 'Google Play'], highlight: 'Products' },
  { tags: ['Computer Engineering', 'Software Foundations', 'Applied Projects'], highlight: 'Degree' },
];

const EXPERIENCE_META_ES: ExperienceMeta[] = [
  { tags: ['Flutter', 'Dart', 'Node.js', 'TypeScript', 'Next.js', 'Firebase', 'SQL'], highlight: 'Ahora' },
  { tags: ['Node.js', 'Admin web', 'Linux', 'Operaciones'], highlight: 'Escala' },
  { tags: ['Android', 'Kotlin', 'Firebase', 'Datos en tiempo real', 'Google Play'], highlight: 'Productos' },
  { tags: ['Ingeniería Informática', 'Fundamentos de software', 'Proyectos aplicados'], highlight: 'Título' },
];

export function useExperience() {
  const { lang } = useLang();
  return lang === 'es'
    ? { experience: EXPERIENCE_ES, meta: EXPERIENCE_META_ES }
    : { experience: EXPERIENCE_EN, meta: EXPERIENCE_META_EN };
}
