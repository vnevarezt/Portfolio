import type { Post, PostMarkKind } from '@/types';
import type { Lang } from '@/i18n/types';

export type PostBodyBlock =
  | { type: 'lede'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'list'; items: string[] };

/** Bodies are keyed by the post's stable `mark`, not its (localized) title. */
const BODIES_EN: Partial<Record<PostMarkKind, PostBodyBlock[]>> = {
  auth: [
    {
      type: 'lede',
      text:
        "The Sign-In screen is the front desk of your product. It's where curiosity meets friction — and where most teams quietly lose 30% of users they paid to acquire.",
    },
    { type: 'h2', text: 'The customs-control problem' },
    {
      type: 'p',
      text:
        'Default auth feels like customs: a tall counter, a clipboard, and a stranger asking for documents. The user did nothing wrong, yet the room implies suspicion. We can keep the security and lose the suspicion.',
    },
    { type: 'pull', text: 'Security is non-negotiable. Hostility is optional.' },
    { type: 'h2', text: 'Three changes that earned us 18% more sign-ins' },
    {
      type: 'p',
      text:
        "None of these are clever. They're table-stakes that most teams skip because the auth flow is owned by nobody on the design team.",
    },
    {
      type: 'list',
      items: [
        "Lead with the verb. 'Continue with email' beats 'Email address' as a label — it tells the user what happens next.",
        'Inline validation, late. Validate on blur, not on every keystroke. Nobody wants to be told their email is wrong while they are still typing it.',
        "Forgive the typo. If a user types 'gnail.com', offer 'gmail.com' as a one-tap fix. We saw 4% of failed logins recover this way.",
      ],
    },
    { type: 'h2', text: 'What we kept' },
    {
      type: 'p',
      text:
        'Two-factor auth. Rate limiting. Honest error messages that name the problem without leaking which field was wrong. Polite friction is still friction — but the user understands why it is there.',
    },
    {
      type: 'p',
      text: "The goal isn't a frictionless door. It's a door the user is happy to walk through.",
    },
  ],
  '2fa': [
    {
      type: 'lede',
      text:
        "I rolled my own 2FA for vnevarezt in 2022. It worked — but the first iteration was embarrassing. Here's what I'd do differently.",
    },
    { type: 'h2', text: 'The mistake: trusting the timestamp' },
    {
      type: 'p',
      text:
        "My first version generated TOTP codes server-side and emailed them. Fine, until a user's email was 90 seconds late and the code expired in their inbox. Trust the user's authenticator app, not your SMTP queue.",
    },
    { type: 'pull', text: "If you can't ship it offline, it's not really 2FA." },
    { type: 'h2', text: "What I'd do today" },
    {
      type: 'list',
      items: [
        'WebAuthn first, TOTP fallback. Passkeys eat your lunch in UX terms.',
        'Recovery codes as a printable PDF, not a one-time toast.',
        'Backup codes that obviously look like backup codes — group them in fives, monospace, copyable.',
      ],
    },
    {
      type: 'p',
      text:
        "The lesson isn't 'use a library.' It's 'design the recovery flow before the happy path.' Users will always lose their device — your job is to make that day survivable.",
    },
  ],
};

const BODIES_ES: Partial<Record<PostMarkKind, PostBodyBlock[]>> = {
  auth: [
    {
      type: 'lede',
      text:
        'La pantalla de inicio de sesión es la recepción de tu producto. Es donde la curiosidad choca con la fricción — y donde la mayoría de los equipos pierde en silencio al 30% de los usuarios que pagó por adquirir.',
    },
    { type: 'h2', text: 'El problema del control de aduana' },
    {
      type: 'p',
      text:
        'La autenticación por defecto se siente como una aduana: un mostrador alto, una tabla con documentos y un extraño pidiendo papeles. El usuario no hizo nada malo, pero el ambiente sugiere sospecha. Podemos conservar la seguridad y perder la sospecha.',
    },
    { type: 'pull', text: 'La seguridad no es negociable. La hostilidad sí.' },
    { type: 'h2', text: 'Tres cambios que nos dieron 18% más inicios de sesión' },
    {
      type: 'p',
      text:
        'Ninguno es ingenioso. Son lo mínimo indispensable que la mayoría de los equipos omite porque el flujo de autenticación no es responsabilidad de nadie en el equipo de diseño.',
    },
    {
      type: 'list',
      items: [
        "Empieza con el verbo. 'Continuar con correo' funciona mejor que 'Correo electrónico' como etiqueta: le dice al usuario qué pasa después.",
        'Validación en línea, pero tarde. Valida al salir del campo, no en cada tecla. Nadie quiere que le digan que su correo está mal mientras todavía lo escribe.',
        "Perdona el typo. Si el usuario escribe 'gnail.com', ofrece 'gmail.com' como corrección de un toque. Vimos que el 4% de los inicios fallidos se recuperan así.",
      ],
    },
    { type: 'h2', text: 'Lo que conservamos' },
    {
      type: 'p',
      text:
        'Autenticación de dos factores. Límites de intentos. Mensajes de error honestos que nombran el problema sin filtrar qué campo estaba mal. La fricción amable sigue siendo fricción — pero el usuario entiende por qué está ahí.',
    },
    {
      type: 'p',
      text: 'La meta no es una puerta sin fricción. Es una puerta que el usuario cruce con gusto.',
    },
  ],
  '2fa': [
    {
      type: 'lede',
      text:
        'Construí mi propio 2FA para vnevarezt en 2022. Funcionó — pero la primera iteración fue vergonzosa. Esto es lo que haría diferente.',
    },
    { type: 'h2', text: 'El error: confiar en el timestamp' },
    {
      type: 'p',
      text:
        'Mi primera versión generaba códigos TOTP en el servidor y los enviaba por correo. Bien, hasta que el correo de un usuario llegó 90 segundos tarde y el código expiró en su bandeja. Confía en la app de autenticación del usuario, no en tu cola SMTP.',
    },
    { type: 'pull', text: 'Si no funciona offline, no es realmente 2FA.' },
    { type: 'h2', text: 'Lo que haría hoy' },
    {
      type: 'list',
      items: [
        'WebAuthn primero, TOTP como respaldo. Las passkeys ganan por goleada en UX.',
        'Códigos de recuperación como PDF imprimible, no como un toast de una sola vez.',
        'Códigos de respaldo que se vean obviamente como códigos de respaldo: agrupados de cinco en cinco, monoespaciados, copiables.',
      ],
    },
    {
      type: 'p',
      text:
        "La lección no es 'usa una librería'. Es 'diseña el flujo de recuperación antes que el camino feliz'. Los usuarios siempre van a perder su dispositivo — tu trabajo es hacer que ese día sea sobrevivible.",
    },
  ],
};

const POST_BODIES: Record<Lang, Partial<Record<PostMarkKind, PostBodyBlock[]>>> = {
  en: BODIES_EN,
  es: BODIES_ES,
};

/** Falls back to the post's excerpt as a lede when no body exists yet. */
export function getPostBody(lang: Lang, post: Post): PostBodyBlock[] {
  return POST_BODIES[lang][post.mark] ?? [{ type: 'lede', text: post.excerpt }];
}
