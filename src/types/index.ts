export type ThemeMode = 'dark' | 'light';

export type ProjectKind = 'vc' | 'lumen' | 'tinta' | 'desk' | 'pal' | 'kaito';
export type ServiceKind = 'web' | 'droid' | 'ui' | 'desk';
export type PostMarkKind = 'auth' | '2fa' | 'android' | 'oklch';

export interface Project {
  title: string;
  cat: string;
  year: string;
  desc: string;
  stack: string[];
  mark: ProjectKind;
  featured?: boolean;
}

export interface Experience {
  role: string;
  org: string;
  time: string;
  desc: string;
}

export interface ExperienceMeta {
  tags: string[];
  highlight: string;
}

export interface Post {
  title: string;
  date: string;
  read: string;
  cat: string;
  mark: PostMarkKind;
  excerpt: string;
  hue: number;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SocialLink {
  name: string;
  url: string;
}
