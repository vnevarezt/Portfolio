---
name: verify
description: Build, launch and drive this portfolio (Vite + React) to verify UI changes end-to-end with screenshots.
---

# Verify: vicentcodes-portfolio

## Build / launch

```bash
npm run typecheck && npm run lint   # CI gates (fast)
npm run dev -- --port 5199          # dev server, run in background
```

## Drive (headless Chrome via playwright-core)

No Playwright in the repo. Install `playwright-core` in a scratch dir and
launch with `channel: 'chrome'` (system Chrome, no browser download):

```js
const browser = await chromium.launch({ channel: 'chrome', headless: true });
```

Flows worth driving:

- Desktop (1440×900): Hero → About → Work → Contact via the **sidebar**
  nav buttons (their accessible names include the index: use
  `locator('aside').getByRole('button', { name: /Work/ })`).
- Work: category filter + Projects/Writing toggle are `role="group"`
  (`Project category`, `Work view`). Project cards are
  `role="button"` named `Open project detail for <title>`.
- Dialogs: project detail + article detail (`Open article <title>`);
  close with `Escape`.
- Contact form: labels `Name`/`Email`/`Message` — always pass
  `{ exact: true }`; all four tab sections stay mounted in the
  scroll-snap container, so loose selectors hit duplicates (e.g. the
  Writing subscribe field is also an "Email" textbox).
- Mobile (390×844, `isMobile: true, hasTouch: true`): bottom nav buttons
  are plain `Home/About/Work/Contact` but collide with hero CTAs
  ("View work") — use `{ exact: true }`.
- Light theme: no toggle in the desktop UI; set it directly:
  `document.documentElement.setAttribute('data-theme', 'light')`.
- Links page: `/me` route.

Collect `console`/`pageerror` events; the app should produce none.

## Gotchas

- `rtk find` (hook proxy) rejects compound predicates — use plain `find`
  or `ls`/`grep`.
- All sections render at once inside the scroll-snap `MainPanel`;
  screenshots of a section require navigating (which scrolls) first.
