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
  HydroSense: {
    headline:
      'End-to-end hydroponic monitoring: from ESP32 firmware on the tank, through a REST API, all the way to a real-time Android dashboard.',
    context:
      'Three coordinated repositories shipping as one product — ESP32 firmware that reads water-quality sensors and drives a pump, a REST API for ingestion, and an Android client that turns the stream into interactive charts.',
    challenge:
      'Move noisy multi-sensor telemetry from physical hardware to a phone without losing fidelity, keeping the Android UI fast and useful even when connectivity drops.',
    approach:
      'On-device firmware (ESP32 / Arduino C++) samples TDS, DS18B20 temperature and analog pH, averages multi-shot reads, controls a water pump via H-bridge, and POSTs JSON over Wi-Fi to the REST API. The Android client (Volley + Gson) caches readings in SharedPreferences for offline-first behavior and renders them through MPAndroidChart with time-range filters; UI built on Material Design components (ChipGroup, Snackbar, AutoCompleteTextView).',
    outcomes: [
      'Hardware → cloud → phone pipeline working end-to-end on a single product.',
      'Five sensor parameters tracked simultaneously in real time.',
      'Offline reads via local cache, cutting redundant network calls.',
      'Pump control on-device via H-bridge, decoupled from API availability.',
      'Min / max / live overlays per chart for quick anomaly spotting.',
    ],
    screenshots: [
      'https://raw.githubusercontent.com/vnevarezt/HydroSenseAndroid/master/s1.png',
    ],
    metrics: [
      { k: '3', v: 'Surfaces (Firmware + API + App)' },
      { k: '5', v: 'Sensor parameters tracked' },
      { k: 'Offline', v: 'Cache-backed reads' },
    ],
    role: 'Hardware + Full-stack · Solo',
    timeline: '2024 · personal project',
    team: 'Solo (three coordinated repos)',
    status: 'Open source · MIT',
    links: [
      { label: 'Android App', href: 'https://github.com/vnevarezt/HydroSenseAndroid' },
      { label: 'REST API', href: 'https://github.com/vnevarezt/HydroSenseApi' },
      { label: 'ESP32 Firmware', href: 'https://github.com/vnevarezt/HydroSense' },
    ],
  },
  'Minecraft Admin Suite': {
    headline:
      'A two-surface Minecraft server admin: a desktop web panel for full control and a mobile companion to monitor and tweak on the go.',
    context:
      'Two coordinated repositories that ship as a single product — a Node + Express + EJS admin panel covering the server console, and a React Native (Expo) companion app mirroring the most-used flows for mobile.',
    challenge:
      'Operate a Minecraft server without staying glued to the host: roles, players, server settings and gameplay tuning need to be reachable from a desktop dashboard and a phone, with shared semantics and consistent UX.',
    approach:
      'Backend admin built on Express + EJS with auth-gated routes for panel, players, roles, server and gameplay (jugabilidad). The mobile client uses Expo + React Query + Axios with Supabase as the data layer, splitting the experience across Onboarding, Home, Dashboard, Players and Configuration screens.',
    outcomes: [
      'Single product spanning a desktop admin panel and a mobile companion.',
      'Five mobile screens covering setup, daily ops and live tuning.',
      'Server roles, players, gameplay and config editable from either surface.',
      'Auth-gated routes on the panel for safe remote access.',
    ],
    screenshots: [],
    metrics: [
      { k: '2', v: 'Surfaces (Web + Mobile)' },
      { k: '5', v: 'Mobile screens' },
      { k: '6', v: 'Admin routes' },
    ],
    role: 'Full-stack Developer · Solo',
    timeline: '2025 · personal project',
    team: 'Solo (two coordinated repos)',
    status: 'Open source · in development',
    links: [
      { label: 'Mobile App', href: 'https://github.com/vnevarezt/MineServerApp' },
      { label: 'Admin Panel', href: 'https://github.com/vnevarezt/minecraft-admin' },
    ],
  },
  Zoop: {
    headline:
      'A location-aware social network shipped on Google Play that pairs customers with nearby workers through a feed of posts, categories and direct messaging.',
    context:
      'Native Android app (com.vicecode.zoop) live on Google Play, built around two user roles — Customer and Worker — and a Firebase backend covering auth, data, media and analytics.',
    challenge:
      'Build a full social-network experience on Android — sign-up with role selection, geo-aware feeds, posts with media, categorized discovery and 1-to-1 chat — without standing up a custom backend, while keeping the UX coherent across local, global and followed feeds.',
    approach:
      'Kotlin app on AndroidX Navigation with view binding, leaning on Firebase as the entire backend: Auth (email/password + verification + password reset), Firestore and Realtime Database for posts, comments and chats, Cloud Storage for images, and Analytics for usage. Three feed fragments (Local, Global, Followed) plus a Suggestion fragment compose the home tab, with Play Services Location driving the "near you" feed and ML Kit Language ID classifying post text. Glide and Picasso handle image loading; Lottie powers the splash and empty-state animations.',
    outcomes: [
      'Live on Google Play (com.vicecode.zoop) — versionName 1.0.0.3, versionCode 8.',
      'Two-role sign-up (Customer / Worker) with email verification and password recovery.',
      'Three coordinated feeds — Local, Global and Followed — sharing the same post model.',
      'In-app 1-to-1 chat with chat list and message threads backed by Firebase.',
      'Post creation flow with image upload, category selection and geo-tagging.',
      'Account-deletion flow with optional feedback, meeting Play Store data-control requirements.',
    ],
    screenshots: [
      '/zoop-1.png',
      '/zoop-2.png',
    ],
    metrics: [
      { k: '12+', v: 'Activities & fragments' },
      { k: '4', v: 'Home feeds (Local / Global / Followed / Suggestion)' },
      { k: '21', v: 'Min Android API supported' },
      { k: 'Play Store', v: 'Distribution channel' },
    ],
    role: 'Android Developer · Solo',
    timeline: '2023 · personal product',
    team: 'Solo',
    status: 'Published on Google Play',
    links: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.vicecode.zoop&hl=es_MX' },
    ],
  },
  Algeb: {
    headline:
      'An Android calculator built around the operations math students actually struggle with — matrices, complex numbers and linear systems.',
    context:
      'Native Android app focused on three task-specific math tools, packaged as a single offline-friendly APK so it works in classrooms without connectivity.',
    challenge:
      'Bring three distinct math domains (matrix inverses / determinants / transposes, complex arithmetic and equation systems) into a single coherent UI without overwhelming the user with options.',
    approach:
      'Three task-focused flows behind a shared menu — Matrix Solver, Complex Number Calculator and Equation Solver — built in Kotlin + Java on the native Android UI toolkit, with Cramer’s Rule for systems and standard linear-algebra routines for matrices.',
    outcomes: [
      'Matrix inverse, determinant and transpose from a single grid input.',
      'Complex arithmetic in standard form (a + bi) for +, −, ×, ÷.',
      'Linear systems solved via Cramer’s Rule from raw coefficients.',
      'APK distributable for offline classroom use, Android 5.0+.',
    ],
    screenshots: [
      'https://raw.githubusercontent.com/vnevarezt/Algeb/master/screenshot.png',
    ],
    metrics: [
      { k: '3', v: 'Calculators in one' },
      { k: '5.0+', v: 'Android API supported' },
      { k: 'Offline', v: 'No connectivity required' },
    ],
    role: 'Android Developer · Solo',
    timeline: '2022 · personal project',
    team: 'Solo',
    status: 'Open source · MIT',
    links: [
      { label: 'Repository', href: 'https://github.com/vnevarezt/Algeb' },
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
