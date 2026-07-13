import type { Lang } from '@/i18n/types';

/**
 * Single source of truth for the CV, in both languages. Edit here and run
 * `npm run cv:pdf` to regenerate the downloadable PDFs — the /cv page and
 * the PDFs render from this same data, so they never drift apart.
 */

export interface CVDocument {
  labels: {
    profile: string;
    experience: string;
    education: string;
    projects: string;
    skills: string;
    languages: string;
  };
  name: string;
  title: string;
  contact: {
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    web: string;
  };
  summary: string;
  experience: {
    role: string;
    org: string;
    place: string;
    period: string;
    bullets: string[];
  }[];
  education: { degree: string; school: string; detail: string };
  projects: { name: string; year: string; stack: string; desc: string }[];
  skills: { label: string; items: string }[];
  languages: string;
}

const CONTACT: CVDocument['contact'] = {
  location: 'Torreón, Coahuila, México',
  phone: '(676) 112-4186',
  email: 'contact@vnevarezt.com',
  linkedin: 'linkedin.com/in/vnevarezt',
  github: 'github.com/vnevarezt',
  web: 'vnevarezt.com',
};

const ES: CVDocument = {
  labels: {
    profile: 'Perfil Profesional',
    experience: 'Experiencia Profesional',
    education: 'Educación',
    projects: 'Proyectos Personales',
    skills: 'Habilidades Técnicas',
    languages: 'Idiomas',
  },
  name: 'Vicente Nevárez Treviño',
  title: 'Ingeniero de Software · Frontend Móvil y Web',
  contact: CONTACT,
  summary:
    'Ingeniero Informático enfocado en desarrollo frontend móvil y web, con experiencia en aplicaciones nativas e híbridas (Flutter, React, Android, iOS) y servicios backend en Node.js y TypeScript. Actualmente desarrollo plataformas internas en el equipo de Innovación de Grupo Batta, dando servicio a más de 100 oficinas a nivel nacional. Me motivan los proyectos donde el código resuelve problemas medibles y de impacto operativo, no solo demos técnicas.',
  experience: [
    {
      role: 'Ingeniero de Software Full Stack',
      org: 'Grupo Batta',
      place: 'Equipo de Innovación · Torreón, Coahuila',
      period: 'Octubre 2025 – Presente',
      bullets: [
        'Desarrollo en Flutter la aplicación multiplataforma de turnos desplegada en más de 100 oficinas de crédito a nivel nacional, atendiendo un promedio superior a 140 turnos diarios en sucursales de mayor operación.',
        'Diseñé e implementé un algoritmo de priorización inteligente que reordena la cola de atención en tiempo real considerando la experiencia del cliente y el flujo operativo de la sucursal, reduciendo los tiempos de espera en servicios críticos al menos 18% frente a la plataforma .NET previamente en uso.',
        'Implementé cinco interfaces diferenciadas por rol: kiosko de toma de turno, display público de llamado, consola operativa de cajero, panel de supervisión gerencial y dashboard ejecutivo corporativo, integradas a un módulo de analítica en tiempo real con métricas por sucursal y por cajero.',
        'Responsable del frontend del producto y colaborador en backend (Node.js, TypeScript) y autenticación (Firebase), integrando la comunicación con SQL Server mediante APIs REST y gestionando persistencia local en SQLite para sincronización con la base central.',
      ],
    },
    {
      role: 'Desarrollador Web',
      org: 'Grupo Universal Gas',
      place: 'Saltillo, Coahuila',
      period: '2024',
      bullets: [
        'Desarrollé un sistema web administrativo para la gestión interna de órdenes de compra e inventario de equipos, reemplazando un flujo manual previo.',
        'Reduje en 40% el tiempo de gestión de pedidos mediante la digitalización del proceso operativo.',
        'Administré y configuré servidores Linux para mejorar la estabilidad y tiempo de actividad de la plataforma.',
      ],
    },
  ],
  education: {
    degree: 'Ingeniero Informático',
    school: 'Instituto Tecnológico Superior de la Región de los Llanos · Durango, México',
    detail: 'Titulado en Febrero 2025 · Especialización en Ciencia de Datos · Cédula Profesional: 15142663',
  },
  projects: [
    {
      name: 'HydroSense',
      year: '2024',
      stack: 'Kotlin, R, Room, Volley, Gson, AndroidChart',
      desc: 'App Android conectada a sensores IoT para visualización y análisis de datos en tiempo real, con almacenamiento offline mediante Room Database.',
    },
    {
      name: 'Zoop',
      year: '2023 – 2024',
      stack: 'Android Studio, Kotlin, XML, Firebase',
      desc: 'Aplicación Android para búsqueda de servicios locales, con autenticación y gestión segura de datos vía Firebase. Publicada en Google Play.',
    },
  ],
  skills: [
    { label: 'Desarrollo Móvil', items: 'Flutter, Dart, Kotlin, Java, Android, iOS, Android Studio, Hilt, Room' },
    { label: 'Frontend Web', items: 'React, Next.js, TypeScript, JavaScript, HTML, CSS' },
    { label: 'Backend', items: 'Node.js, Express, PHP, APIs REST, Server-Sent Events' },
    { label: 'Bases de Datos', items: 'SQL Server, PostgreSQL, MySQL, SQLite, MongoDB' },
    { label: 'Cloud y Herramientas', items: 'Firebase, Git, administración de servidores Linux' },
    { label: 'Diseño UI/UX', items: 'Figma, Adobe Photoshop, Adobe XD' },
  ],
  languages: 'Español: nativo · Inglés: lectura técnica',
};

const EN: CVDocument = {
  labels: {
    profile: 'Professional Profile',
    experience: 'Professional Experience',
    education: 'Education',
    projects: 'Personal Projects',
    skills: 'Technical Skills',
    languages: 'Languages',
  },
  name: 'Vicente Nevárez Treviño',
  title: 'Software Engineer · Mobile & Web Frontend',
  contact: CONTACT,
  summary:
    'Computer Engineer focused on mobile and web frontend development, with experience in native and hybrid applications (Flutter, React, Android, iOS) and backend services in Node.js and TypeScript. I currently build internal platforms on the Innovation team at Grupo Batta, serving more than 100 offices nationwide. I am motivated by projects where code solves measurable, operationally impactful problems — not just technical demos.',
  experience: [
    {
      role: 'Full Stack Software Engineer',
      org: 'Grupo Batta',
      place: 'Innovation Team · Torreón, Coahuila',
      period: 'October 2025 – Present',
      bullets: [
        'Build the cross-platform queue-management app in Flutter, deployed across 100+ credit offices nationwide, handling an average of 140+ daily tickets in the busiest branches.',
        'Designed and implemented a smart prioritization algorithm that reorders the service queue in real time based on customer experience and branch operations, cutting wait times for critical services by at least 18% versus the previous .NET platform.',
        'Implemented five role-specific interfaces: ticket kiosk, public calling display, teller console, supervision panel and corporate executive dashboard, integrated with a real-time analytics module with per-branch and per-teller metrics.',
        'Own the product frontend and contribute to the backend (Node.js, TypeScript) and authentication (Firebase), integrating with SQL Server through REST APIs and managing local SQLite persistence for syncing with the central database.',
      ],
    },
    {
      role: 'Web Developer',
      org: 'Grupo Universal Gas',
      place: 'Saltillo, Coahuila',
      period: '2024',
      bullets: [
        'Built an administrative web system for internal purchase orders and equipment inventory, replacing a previously manual workflow.',
        'Cut order-management time by 40% by digitizing the operational process.',
        'Administered and configured Linux servers to improve platform stability and uptime.',
      ],
    },
  ],
  education: {
    degree: 'B.Eng. in Computer Engineering',
    school: 'Instituto Tecnológico Superior de la Región de los Llanos · Durango, México',
    detail: 'Graduated February 2025 · Specialization in Data Science · Professional License: 15142663',
  },
  projects: [
    {
      name: 'HydroSense',
      year: '2024',
      stack: 'Kotlin, R, Room, Volley, Gson, AndroidChart',
      desc: 'Android app connected to IoT sensors for real-time data visualization and analysis, with offline storage via Room Database.',
    },
    {
      name: 'Zoop',
      year: '2023 – 2024',
      stack: 'Android Studio, Kotlin, XML, Firebase',
      desc: 'Android app for finding local services, with authentication and secure data management via Firebase. Published on Google Play.',
    },
  ],
  skills: [
    { label: 'Mobile Development', items: 'Flutter, Dart, Kotlin, Java, Android, iOS, Android Studio, Hilt, Room' },
    { label: 'Web Frontend', items: 'React, Next.js, TypeScript, JavaScript, HTML, CSS' },
    { label: 'Backend', items: 'Node.js, Express, PHP, REST APIs, Server-Sent Events' },
    { label: 'Databases', items: 'SQL Server, PostgreSQL, MySQL, SQLite, MongoDB' },
    { label: 'Cloud & Tools', items: 'Firebase, Git, Linux server administration' },
    { label: 'UI/UX Design', items: 'Figma, Adobe Photoshop, Adobe XD' },
  ],
  languages: 'Spanish: native · English: technical reading',
};

export const CV_DATA: Record<Lang, CVDocument> = { en: EN, es: ES };

export function cvPdfFilename(lang: Lang): string {
  return `Vicente-Nevarez-Trevino-CV-${lang.toUpperCase()}.pdf`;
}

export function cvPdfPath(lang: Lang): string {
  return `/cv/${cvPdfFilename(lang)}`;
}
