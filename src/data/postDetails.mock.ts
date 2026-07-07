import type { Post } from '@/types';

export type PostBodyBlock =
  | { type: 'lede'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'list'; items: string[] };

export const POST_BODIES: Partial<Record<Post['title'], PostBodyBlock[]>> = {
  "Designing auth that users don't hate": [
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
  "My 2FA implementation: what I'd change": [
    {
      type: 'lede',
      text:
        "I rolled my own 2FA for VicentCodes in 2022. It worked — but the first iteration was embarrassing. Here's what I'd do differently.",
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

export const DEFAULT_POST_BODY: PostBodyBlock[] = [
  { type: 'lede', text: 'Full text coming soon. This is a preview placeholder for the article body.' },
];
