import type { Lang } from '@/i18n/types';
import { SOCIAL_LINKS } from '@/data/social';

/** Canonical origin — the single source of truth for absolute SEO URLs. */
export const SITE_URL = 'https://vnevarezt.com';
export const SITE_NAME = 'Vicente Nevárez';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const AVATAR = `${SITE_URL}/avatar.jpg`;
export const TWITTER_HANDLE = '@vnevarezt';
export const EMAIL = 'contact@vnevarezt.com';

/** Profiles that identify the same person (schema.org `sameAs`). */
export const SAME_AS: string[] = [
  ...SOCIAL_LINKS.map((s) => s.url),
  'https://instagram.com/vnevarezt',
];

export const JOB_TITLE: Record<Lang, string> = {
  en: 'Developer & Interface Designer',
  es: 'Desarrollador y Diseñador de Interfaces',
};

export interface RouteSeo {
  title: string;
  description: string;
  keywords: string;
}

/** Per base-route × language metadata. Keyed by the language-neutral route. */
export const SEO: Record<string, Record<Lang, RouteSeo>> = {
  '/': {
    en: {
      title: 'Vicente Nevárez — Developer & Interface Designer',
      description:
        'Developer and interface designer turning complex ideas into calm, intuitive software. Portfolio, selected projects, experience and CV.',
      keywords:
        'Vicente Nevárez, developer, interface designer, frontend developer, UI, UX, React, TypeScript, product design, portfolio',
    },
    es: {
      title: 'Vicente Nevárez — Desarrollador y Diseñador de Interfaces',
      description:
        'Desarrollador y diseñador de interfaces que convierte ideas complejas en software calmado e intuitivo. Portfolio, proyectos, experiencia y CV.',
      keywords:
        'Vicente Nevárez, desarrollador, diseñador de interfaces, desarrollador frontend, UI, UX, React, TypeScript, diseño de producto, portafolio',
    },
  },
  '/me': {
    en: {
      title: 'Vicente Nevárez — Links & Contact',
      description:
        'All of Vicente Nevárez in one place: portfolio, GitHub, LinkedIn, X, Instagram and a downloadable contact card.',
      keywords:
        'Vicente Nevárez, links, contact, vcard, GitHub, LinkedIn, X, Instagram, developer, designer',
    },
    es: {
      title: 'Vicente Nevárez — Enlaces y Contacto',
      description:
        'Todo Vicente Nevárez en un solo lugar: portfolio, GitHub, LinkedIn, X, Instagram y una tarjeta de contacto descargable.',
      keywords:
        'Vicente Nevárez, enlaces, contacto, vcard, GitHub, LinkedIn, X, Instagram, desarrollador, diseñador',
    },
  },
  '/cv': {
    en: {
      title: 'Vicente Nevárez — CV / Résumé',
      description:
        'The curriculum of Vicente Nevárez, developer and interface designer. Read it online or download the PDF.',
      keywords:
        'Vicente Nevárez, CV, résumé, curriculum, developer, interface designer, experience, hire',
    },
    es: {
      title: 'Vicente Nevárez — CV / Currículum',
      description:
        'El currículum de Vicente Nevárez, desarrollador y diseñador de interfaces. Léelo online o descarga el PDF.',
      keywords:
        'Vicente Nevárez, CV, currículum, desarrollador, diseñador de interfaces, experiencia, contratar',
    },
  },
};

/** OG/HTML locale code for a language. */
export function ogLocale(lang: Lang): string {
  return lang === 'es' ? 'es_ES' : 'en_US';
}
