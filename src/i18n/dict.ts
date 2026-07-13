import type { Lang } from './types';

/**
 * UI strings for the whole site, per language. Section content that lives
 * in data files (experience, projects, posts, CV, dialog details) is
 * localized in those files instead; this covers component chrome.
 *
 * Titles with an accented word are split into pre/accent/post parts so the
 * accent keeps its color in both languages.
 */
export interface Strings {
  nav: { Home: string; About: string; Work: string; Contact: string };
  common: {
    available: string;
    availabilityNote: string;
    softwareDev: string;
    hireMe: string;
    downloadCV: string;
    viewCV: string;
    cv: string;
  };
  hero: {
    taglinePre: string;
    taglineAccent: string;
    taglinePost: string;
    getInTouch: string;
    viewWork: string;
    spec: { based: string; focus: string; since: string; stack: string };
    specValues: { based: string; focus: string; since: string; stack: string };
  };
  about: {
    kicker: string;
    title: string;
    introPre: string;
    introPost: string;
    body: string;
    cards: { title: string; desc: string }[];
  };
  experience: {
    kicker: string;
    meta: string;
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    lede: string;
    now: string;
    ctaTitle: string;
    ctaSub: string;
  };
  work: {
    kicker: string;
    portfolio: string;
    writing: string;
    viewProjects: string;
    viewWriting: string;
    all: string;
  };
  writing: {
    kicker: string;
    meta: (count: number) => string;
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    lede: string;
    featured: string;
    read: string;
    subscribeTitle: string;
    subscribeSub: string;
    subscribe: string;
    emailPlaceholder: string;
  };
  contact: {
    kicker: string;
    meta: string;
    titlePre: string;
    titleAccent: string;
    titlePost: string;
    ledePre: string;
    ledePost: string;
    available: string;
    featured: string;
    directEmail: string;
    emailDesc: string;
    monFri: string;
    send: string;
    orWriteHere: string;
    formTitlePre: string;
    formTitleAccent: string;
    ctaTitle: string;
    ctaSub: string;
    bookCall: string;
    socials: Record<string, string>;
  };
  form: {
    name: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sentTitle: string;
    sentNote: string;
    another: string;
  };
  workDialog: {
    work: string;
    role: string;
    timeline: string;
    team: string;
    status: string;
    metrics: string;
    stack: string;
    challenge: string;
    approach: string;
    outcomes: string;
    clickToExpand: string;
    escNav: string;
    noImage: string;
    case: string;
    snapshot: string;
  };
  postDialog: {
    essay: string;
    role: string;
    continueReading: string;
    end: string;
    esc: string;
    toClose: string;
  };
  cv: { backToSite: string; downloadPDF: string; label: string };
}

const en: Strings = {
  nav: { Home: 'Home', About: 'About', Work: 'Work', Contact: 'Contact' },
  common: {
    available: 'Available',
    availabilityNote: 'Spring 2026 · remote',
    softwareDev: 'Software dev',
    hireMe: 'Hire me',
    downloadCV: 'Download CV',
    viewCV: 'View CV',
    cv: 'CV',
  },
  hero: {
    taglinePre: 'Developer & interface designer — turning complex ideas into ',
    taglineAccent: 'calm, intuitive software',
    taglinePost: '.',
    getInTouch: 'Get in touch',
    viewWork: 'View work',
    spec: { based: 'Based', focus: 'Focus', since: 'Since', stack: 'Stack' },
    specValues: { based: 'Mexico · remote', focus: 'Web · Android', since: '2018', stack: 'React · Node' },
  },
  about: {
    kicker: '01 · ABOUT',
    title: 'About Me',
    introPre: "I'm ",
    introPost:
      ', a Computer Engineer focused on building useful digital products with clean interfaces, solid architecture, and a clear user-first mindset.',
    body: "I enjoy moving between mobile apps, web platforms, backend APIs, and data-driven features. I care about solving real problems, writing maintainable code, and collaborating with teams that value ownership, clarity, and continuous learning. I'm especially drawn to crafting high-quality interface design that feels clear, consistent, and purposeful.",
    cards: [
      { title: 'Product Mindset', desc: 'Technology decisions based on impact and usability.' },
      { title: 'Mobile, Web & UI Design', desc: 'Flutter, React, and polished interface systems with strong UX quality.' },
      { title: 'Backend Engineering', desc: 'Node.js, TypeScript, API design, and integrations.' },
      { title: 'Data & Cloud', desc: 'Firebase, SQL, and AWS-connected service workflows.' },
    ],
  },
  experience: {
    kicker: 'BACKGROUND',
    meta: '4 chapters · 6+ years',
    titlePre: 'A timeline of ',
    titleAccent: 'becoming',
    titlePost: '.',
    lede: 'From writing my first tag at fifteen to shipping apps that people actually use — each step taught me something worth keeping.',
    now: 'NOW',
    ctaTitle: 'Need the full story?',
    ctaSub: 'Download a one-page CV with every project and stack.',
  },
  work: {
    kicker: '02 · WORK',
    portfolio: 'Portfolio',
    writing: 'Writing',
    viewProjects: 'Projects',
    viewWriting: 'Writing',
    all: 'All',
  },
  writing: {
    kicker: '05 · WRITING',
    meta: (count) => `${count} essays · updated weekly`,
    titlePre: 'Notes from ',
    titleAccent: 'the edit',
    titlePost: '.',
    lede: 'Short essays on design, code, and the in-between. Opinions are mine; typos are too.',
    featured: 'Featured',
    read: 'Read',
    subscribeTitle: 'New essay every other week.',
    subscribeSub: 'No spam. Unsubscribe with one click.',
    subscribe: 'Subscribe',
    emailPlaceholder: 'you@example.com',
  },
  contact: {
    kicker: "04 · LET'S TALK",
    meta: 'Usually replies in < 24h',
    titlePre: "Let's build ",
    titleAccent: 'something',
    titlePost: '.',
    ledePre: 'Freelance, full-time, or just to say hi — I read every message and reply personally within ',
    ledePost: '.',
    available: 'Available',
    featured: 'Featured',
    directEmail: 'Direct Email',
    emailDesc: 'The best way to reach me. I read every email and reply to every real one within 24 hours.',
    monFri: 'Mon–Fri',
    send: 'Send',
    orWriteHere: 'OR WRITE HERE',
    formTitlePre: "Tell me what you're ",
    formTitleAccent: 'building',
    ctaTitle: 'Want the full CV or a quick intro call?',
    ctaSub: "20-min video chat, no agenda. Perfect if you're exploring options.",
    bookCall: 'Book a call',
    socials: {
      LinkedIn: 'Work history & recommendations',
      GitHub: 'Code, side projects & dotfiles',
      X: 'Thinking out loud, occasionally',
    },
  },
  form: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    messagePlaceholder: 'Your message…',
    send: 'Send',
    sentTitle: 'Sent!',
    sentNote: "I'll reply within 24h.",
    another: 'Another',
  },
  workDialog: {
    work: 'WORK',
    role: 'Role',
    timeline: 'Timeline',
    team: 'Team',
    status: 'Status',
    metrics: 'Metrics',
    stack: 'Stack',
    challenge: 'Challenge',
    approach: 'Approach',
    outcomes: 'Outcomes',
    clickToExpand: 'Click to expand',
    escNav: 'ESC TO CLOSE · ← → NAV',
    noImage: 'NO IMAGE',
    case: 'Case',
    snapshot: 'Snapshot',
  },
  postDialog: {
    essay: 'Essay',
    role: 'Developer',
    continueReading: 'Continue reading',
    end: 'END',
    esc: 'ESC',
    toClose: 'to close',
  },
  cv: { backToSite: 'Back to site', downloadPDF: 'Download PDF', label: 'CV' },
};

const es: Strings = {
  nav: { Home: 'Inicio', About: 'Sobre mí', Work: 'Trabajo', Contact: 'Contacto' },
  common: {
    available: 'Disponible',
    availabilityNote: 'Primavera 2026 · remoto',
    softwareDev: 'Desarrollador de software',
    hireMe: 'Contrátame',
    downloadCV: 'Descargar CV',
    viewCV: 'Ver CV',
    cv: 'CV',
  },
  hero: {
    taglinePre: 'Desarrollador y diseñador de interfaces — convierto ideas complejas en ',
    taglineAccent: 'software claro e intuitivo',
    taglinePost: '.',
    getInTouch: 'Hablemos',
    viewWork: 'Ver trabajo',
    spec: { based: 'Ubicación', focus: 'Enfoque', since: 'Desde', stack: 'Stack' },
    specValues: { based: 'México · remoto', focus: 'Web · Android', since: '2018', stack: 'React · Node' },
  },
  about: {
    kicker: '01 · SOBRE MÍ',
    title: 'Sobre mí',
    introPre: 'Soy ',
    introPost:
      ', Ingeniero Informático enfocado en construir productos digitales útiles, con interfaces limpias, arquitectura sólida y una clara mentalidad centrada en el usuario.',
    body: 'Disfruto moverme entre apps móviles, plataformas web, APIs de backend y funciones basadas en datos. Me importa resolver problemas reales, escribir código mantenible y colaborar con equipos que valoran la responsabilidad, la claridad y el aprendizaje continuo. Me atrae especialmente crear diseño de interfaces de alta calidad que se sienta claro, consistente y con propósito.',
    cards: [
      { title: 'Mentalidad de producto', desc: 'Decisiones técnicas basadas en impacto y usabilidad.' },
      { title: 'Móvil, web y diseño UI', desc: 'Flutter, React y sistemas de interfaz pulidos con fuerte calidad UX.' },
      { title: 'Ingeniería de backend', desc: 'Node.js, TypeScript, diseño de APIs e integraciones.' },
      { title: 'Datos y nube', desc: 'Firebase, SQL y flujos de servicio conectados a AWS.' },
    ],
  },
  experience: {
    kicker: 'TRAYECTORIA',
    meta: '4 capítulos · 6+ años',
    titlePre: 'Una línea de tiempo de ',
    titleAccent: 'evolución',
    titlePost: '.',
    lede: 'Desde escribir mi primera etiqueta a los quince hasta lanzar apps que la gente realmente usa: cada paso me enseñó algo que vale la pena conservar.',
    now: 'AHORA',
    ctaTitle: '¿Quieres la historia completa?',
    ctaSub: 'Descarga un CV de una página con cada proyecto y stack.',
  },
  work: {
    kicker: '02 · TRABAJO',
    portfolio: 'Portafolio',
    writing: 'Escritos',
    viewProjects: 'Proyectos',
    viewWriting: 'Escritos',
    all: 'Todos',
  },
  writing: {
    kicker: '05 · ESCRITOS',
    meta: (count) => `${count} ensayos · actualizado cada semana`,
    titlePre: 'Notas desde ',
    titleAccent: 'la edición',
    titlePost: '.',
    lede: 'Ensayos breves sobre diseño, código y lo que hay entre medias. Las opiniones son mías; los typos también.',
    featured: 'Destacado',
    read: 'Leer',
    subscribeTitle: 'Un ensayo nuevo cada dos semanas.',
    subscribeSub: 'Sin spam. Cancela con un clic.',
    subscribe: 'Suscribirse',
    emailPlaceholder: 'tu@ejemplo.com',
  },
  contact: {
    kicker: '04 · HABLEMOS',
    meta: 'Suele responder en < 24h',
    titlePre: 'Construyamos ',
    titleAccent: 'algo',
    titlePost: '.',
    ledePre: 'Freelance, tiempo completo o solo para saludar: leo cada mensaje y respondo personalmente en menos de ',
    ledePost: '.',
    available: 'Disponible',
    featured: 'Destacado',
    directEmail: 'Correo directo',
    emailDesc: 'La mejor forma de contactarme. Leo cada correo y respondo cada mensaje real en menos de 24 horas.',
    monFri: 'Lun–Vie',
    send: 'Enviar',
    orWriteHere: 'O ESCRIBE AQUÍ',
    formTitlePre: 'Cuéntame qué estás ',
    formTitleAccent: 'construyendo',
    ctaTitle: '¿Quieres el CV completo o una llamada rápida?',
    ctaSub: 'Videollamada de 20 min, sin agenda. Ideal si estás explorando opciones.',
    bookCall: 'Agendar llamada',
    socials: {
      LinkedIn: 'Trayectoria y recomendaciones',
      GitHub: 'Código, proyectos y dotfiles',
      X: 'Pensando en voz alta, de vez en cuando',
    },
  },
  form: {
    name: 'Nombre',
    email: 'Correo',
    message: 'Mensaje',
    messagePlaceholder: 'Tu mensaje…',
    send: 'Enviar',
    sentTitle: '¡Enviado!',
    sentNote: 'Te respondo en menos de 24h.',
    another: 'Otro',
  },
  workDialog: {
    work: 'TRABAJO',
    role: 'Rol',
    timeline: 'Duración',
    team: 'Equipo',
    status: 'Estado',
    metrics: 'Métricas',
    stack: 'Stack',
    challenge: 'Reto',
    approach: 'Enfoque',
    outcomes: 'Resultados',
    clickToExpand: 'Clic para ampliar',
    escNav: 'ESC PARA CERRAR · ← → NAVEGAR',
    noImage: 'SIN IMAGEN',
    case: 'Caso',
    snapshot: 'Resumen',
  },
  postDialog: {
    essay: 'Ensayo',
    role: 'Desarrollador',
    continueReading: 'Sigue leyendo',
    end: 'FIN',
    esc: 'ESC',
    toClose: 'para cerrar',
  },
  cv: { backToSite: 'Volver al sitio', downloadPDF: 'Descargar PDF', label: 'CV' },
};

export const DICT: Record<Lang, Strings> = { en, es };
