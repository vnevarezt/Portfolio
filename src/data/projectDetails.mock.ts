import type { Project } from '@/types';

export interface ProjectDetailMock {
  headline: string;
  context: string;
  challenge: string;
  approach: string;
  outcomes: string[];
  screenshots: string[];
  metrics: Array<{ k: string; v: string }>;
  role: string;
  timeline: string;
  team: string;
  status: string;
  links: { label: string; href: string }[];
}

export const PROJECT_DETAILS_MOCK: Partial<Record<Project['title'], ProjectDetailMock>> = {
  'VicentCodes Platform': {
    headline: 'A modular platform concept focused on clear writing and secure interactions.',
    context:
      'Mock case study: this detail layout is sample content to preview how a richer project page would look inside your system.',
    challenge:
      'Design a portfolio/blog experience that feels premium but stays readable, fast, and predictable across desktop and mobile.',
    approach:
      'Defined a compact design language, split UI blocks by responsibility, and validated interactions through progressive prototypes.',
    outcomes: [
      'Improved visual hierarchy for project discovery.',
      'Consistent card density across sections.',
      'Cleaner storytelling structure for each project.',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    ],
    metrics: [
      { k: '99.9%', v: 'Uptime target' },
      { k: '-32%', v: 'Faster internal flow' },
      { k: '3x', v: 'Feature delivery cadence' },
    ],
    role: 'Product-minded Full Stack Engineer',
    timeline: '6 weeks · concept sprint',
    team: 'Solo with async stakeholder reviews',
    status: 'Mock preview',
    links: [
      { label: 'Live Demo', href: '#' },
      { label: 'Repository', href: '#' },
    ],
  },
  'Lumen Notes': {
    headline: 'A calm note-taking concept with mobile-first UX and offline-friendly patterns.',
    context:
      'Mock case study: content is placeholder text intended only to evaluate visual direction and interaction quality.',
    challenge:
      'Balance quick capture workflows with organization features while keeping the interface minimal and friendly.',
    approach:
      'Prototyped lightweight flows, tuned typography rhythm, and applied reusable components for long-term maintainability.',
    outcomes: [
      'Reduced interaction friction in key capture flows.',
      'Better readability with compact spacing tokens.',
      'Scalable component structure for future modules.',
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80',
    ],
    metrics: [
      { k: '+41%', v: 'Retention in prototype tests' },
      { k: '-28%', v: 'Interaction steps per task' },
      { k: '4.8/5', v: 'Usability score' },
    ],
    role: 'Mobile + UX-focused Engineer',
    timeline: '4 weeks · exploratory build',
    team: 'Solo prototype',
    status: 'Mock preview',
    links: [
      { label: 'Prototype', href: '#' },
      { label: 'Design Notes', href: '#' },
    ],
  },
};

export const DEFAULT_PROJECT_DETAIL_MOCK: ProjectDetailMock = {
  headline: 'A placeholder case study structure to preview final UI direction.',
  context: 'This is sample content. Replace with real case-study material when ready.',
  challenge: 'Define a clear narrative that communicates value quickly.',
  approach: 'Use consistent sections: context, challenge, approach, and outcomes.',
  outcomes: ['Readable structure', 'Consistent UI language', 'Easy to scan on all screens'],
  screenshots: [
    'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1600&q=80',
  ],
  metrics: [
    { k: 'TBD', v: 'Primary KPI' },
    { k: 'TBD', v: 'Secondary KPI' },
    { k: 'TBD', v: 'Outcome quality' },
  ],
  role: 'Project contributor',
  timeline: 'To be defined',
  team: 'To be defined',
  status: 'Draft',
  links: [{ label: 'Reference Link', href: '#' }],
};