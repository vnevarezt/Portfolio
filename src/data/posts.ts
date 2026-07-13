import type { Post } from '@/types';
import { useLang } from '@/i18n/useLang';

const POSTS_EN: Post[] = [
  {
    title: "Designing auth that users don't hate",
    date: 'Mar 2026',
    read: '6 min',
    cat: 'UX',
    mark: 'auth',
    excerpt:
      'Why the default Sign In screen feels like customs control — and three small changes that make users smile instead of sigh.',
    hue: 130,
  },
  {
    title: "My 2FA implementation: what I'd change",
    date: 'Feb 2026',
    read: '9 min',
    cat: 'Backend',
    mark: '2fa',
    excerpt:
      'What I learned from rolling my own 2FA for vnevarezt, including the embarrassing first iteration.',
    hue: 45,
  },
];

const POSTS_ES: Post[] = [
  {
    title: 'Diseñar autenticación que no odien los usuarios',
    date: 'Mar 2026',
    read: '6 min',
    cat: 'UX',
    mark: 'auth',
    excerpt:
      'Por qué la pantalla de inicio de sesión típica se siente como pasar por aduana, y tres cambios pequeños que hacen sonreír al usuario en vez de suspirar.',
    hue: 130,
  },
  {
    title: 'Mi implementación de 2FA: qué cambiaría',
    date: 'Feb 2026',
    read: '9 min',
    cat: 'Backend',
    mark: '2fa',
    excerpt:
      'Lo que aprendí al construir mi propio 2FA para vnevarezt, incluyendo la vergonzosa primera iteración.',
    hue: 45,
  },
];

export function usePosts() {
  const { lang } = useLang();
  return lang === 'es' ? POSTS_ES : POSTS_EN;
}
