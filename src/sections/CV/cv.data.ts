/**
 * Single source of truth for the CV. Edit this file and run
 * `npm run cv:pdf` to regenerate the downloadable PDF — the /cv page
 * and the PDF render from this same data, so they never drift apart.
 */

export const CV = {
  name: 'Vicente Nevárez Treviño',
  title: 'Ingeniero de Software · Frontend Móvil y Web',
  contact: {
    location: 'Torreón, Coahuila, México',
    phone: '(676) 112-4186',
    email: 'contact@vicentcodes.com',
    linkedin: 'linkedin.com/in/VicentCodes',
    github: 'github.com/VicentCodes',
    web: 'vicentcodes.com',
  },
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
} as const;

export const CV_PDF_PATH = '/cv/Vicente-Nevarez-Trevino-CV.pdf';
export const CV_PDF_FILENAME = 'Vicente-Nevarez-Trevino-CV.pdf';
