import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    title: 'HydroSense',
    cat: 'Android',
    year: '2024',
    desc: 'End-to-end hydroponic monitoring: ESP32 firmware → REST API → Android app for real-time pH, TDS and temperature.',
    stack: ['Kotlin', 'C++', 'ESP32', 'MPAndroidChart', 'Volley', 'Gson', 'Material Design'],
    mark: 'hydro',
    featured: true,
  },
  {
    title: 'Minecraft Admin Suite',
    cat: 'Full-stack',
    year: '2025',
    desc: 'Cross-platform Minecraft server admin: Express + EJS web panel paired with a React Native (Expo) companion app.',
    stack: ['React Native', 'Expo', 'Node', 'Express', 'EJS', 'Supabase'],
    mark: 'mine',
    featured: true,
  },
  {
    title: 'Zoop',
    cat: 'Android',
    year: '2023',
    desc: 'Location-aware social network on Google Play that connects customers with nearby workers via posts, categories and direct messaging.',
    stack: ['Kotlin', 'Firebase', 'Firestore', 'Realtime DB', 'Auth', 'Cloud Storage', 'Play Services Location', 'ML Kit', 'Glide', 'Lottie'],
    mark: 'zoop',
    featured: true,
  },
  {
    title: 'Algeb',
    cat: 'Android',
    year: '2022',
    desc: 'Android calculator for matrix inverses, complex number arithmetic and linear equation systems.',
    stack: ['Kotlin', 'Java', 'Android'],
    mark: 'algeb',
  },
];

export const PROJECT_CATEGORIES: readonly string[] = [
  'All',
  ...Array.from(new Set(PROJECTS.map((p) => p.cat))).sort((a, b) => a.localeCompare(b)),
];
