# DEVELOPER.md — Lokker

A developer who has never seen this repository should be able to understand
the architecture, the design system, and the workflow after reading this file.

Status markers are used throughout: **IMPLEMENTED** (exists, described as it
is), **PLANNED** (next moves), **FUTURE** (reserved boundary, not built).
Documentation must always describe reality — update this file when the
architecture changes.

## 1. Project overview

Lokker is a local-first personal security and digital-utility workspace —
credentials, bookmarks, authentication utilities, privacy utilities, secure
personal data, and security health, managed locally on the user's device.
The password vault is the security core, but the product is broader than a
password manager. See PRODUCT.md for the why. This file is the how.

## 2. Technology stack (IMPLEMENTED)

| Concern | Choice | Version |
| --- | --- | --- |
| Framework | Next.js (App Router) | 16.3.3 |
| Language | JavaScript (intentionally — do not convert to TS) | — |
| UI runtime | React | 19.2.8 |
| Styling | Tailwind CSS | v4 (CSS-first config, no tailwind.config) |
| Components | shadcn/ui (`radix-nova` style, Radix base) | CLI 4.x |
| Icons | lucide-react | 1.x |
| Theming | CSS variables + next-themes (class strategy) | 0.4.x |
| Testing | Vitest + Testing Library (jsdom) | 4.x |
| Linting | ESLint 9 (`eslint-config-next`) | 9.x |

Import alias: `@/*` → `src/*` (jsconfig.json).

## 3. Folder architecture (IMPLEMENTED skeleton, content PLANNED)

```
src/
├── app/                  # Next.js App Router
│   ├── (marketing)/      # Public site boundary (root URLs) — PLANNED (placeholder page now)
│   ├── (app)/app/        # Product workspace under the /app URL prefix — FUTURE
│   ├── design/           # Design-system preview (internal, temporary)
│   ├── globals.css       # Design tokens + theme definitions
│   └── layout.js         # Root layout: fonts, ThemeProvider, metadata
├── components/
│   ├── ui/               # shadcn primitives (generated; small allowed edits)
│   └── theme-provider.jsx
├── config/               # Framework-free app constants (appConfig)
├── domain/               # FUTURE — pure business rules, no framework imports
├── application/          # FUTURE — use cases; orchestrates domain + infra
├── infrastructure/       # FUTURE — IndexedDB, crypto services, extension IPC
├── features/             # PLANNED — feature-oriented UI + hooks
├── hooks/                # PLANNED — shared React hooks (shadcn alias target)
├── lib/                  # IMPLEMENTED — errors.js, utils.js (cn)
└── test/                 # Test setup + cross-cutting tests
```

Dependency direction (enforced by review; see AGENTS.md):

```
UI (app/, features/, components/)
      ↓
Application (use cases)
      ↓
Domain (pure)         Infrastructure (IndexedDB, crypto, browser APIs)
```

- Domain never imports React, Next.js, browser APIs, or infrastructure.
- UI never touches persistence or crypto primitives directly — it goes
  through application services.
- A future `LocalRepository` / `CloudSyncRepository` pair must be swappable
  without touching the domain layer (**FUTURE** boundary).

## 4. Design system (IMPLEMENTED)

### 4.1 Token architecture

All tokens live in `src/app/globals.css` in four layers:

1. **Primitives** — oklch color values per theme in `:root` / `.dark`.
2. **Semantic Lokker tokens** — `--surface`, `--surface-elevated`,
   `--surface-overlay`, `--surface-hover`, `--surface-active`,
   `--border-subtle`, `--border-strong`, `--success/-foreground`,
   `--warning/-foreground`, `--info/-foreground`, `--inset-highlight`,
   `--duration-fast/normal/slow`, `--z-base/dropdown/sticky/modal/toast`.
3. **shadcn mapping** — `--background`, `--card`, `--popover`, `--primary`,
   `--ring`, etc. so shadcn primitives style themselves from our tokens.
4. **Tailwind `@theme inline`** — exposes utilities: `bg-surface`,
   `border-border-subtle`, `text-success`, `text-display`, `text-heading`,
   `text-label`, `text-caption`, `ease-standard`, `ease-emphasized`,
   `shadow-xs…overlay`, `inset-shadow-highlight`, `rounded-sm…4xl`.

Rules:

- No hardcoded colors, shadows, durations, or radii in components. Use the
  utility or `var(--...)`.
- Duration and z-index are **not** Tailwind theme namespaces in v4 — they are
  plain CSS variables. Use `duration-[var(--duration-fast)]`,
  `z-[var(--z-modal)]`.
- Theme switching is class-based (`.dark` on `<html>`) via next-themes;
  default is system, no transition flash (`suppressHydrationWarning`).
- Dark is the primary theme: very dark slate/charcoal (oklch L≈0.16–0.26,
  hue 255), never pure black. Light is designed independently: cool
  gray-blue ramp, borders and shadows carry hierarchy. Both themes share
  token names only.

### 4.2 Tactile interaction system (IMPLEMENTED, base in Button)

- **Hover:** theme-aware brightness shift via
  `color-mix(in oklab, var(--x), var(--foreground) 8%)` — brightens on dark,
  darkens on light, one formula for both themes.
- **Active/pressed:** `translate-y-px` + shadow removed (`active:shadow-none`).
- **Focus:** `ring-3 ring-ring/50` — always visible, token-colored.
- **Disabled:** `opacity-50`, no shadows, pointer events off.
- **Elevation:** raised variants carry `shadow-xs` +
  `inset-shadow-highlight` (a 1px light top edge defined per theme).
- All transitions use `duration-[var(--duration-fast)]` +
  `ease-standard` by default.
- `prefers-reduced-motion: reduce` collapses all transition/animation
  durations globally (globals.css).

### 4.3 Typography

Geist Sans / Geist Mono via `next/font`. Semantic utilities:
`text-display` (2.25rem), `text-heading` (1.375rem), `text-label` (0.875rem),
`text-caption` (0.8125rem) — each with token-defined line-height and letter
spacing. Weights: 400/500/600; avoid heavier.

### 4.4 Design preview

`/design` (src/app/design/page.js) is an internal-only verification surface
demonstrating tokens and components in both themes. It is not a product page
and must be removed or replaced when real surfaces exist.

## 5. Security-sensitive boundaries (PLANNED — rules IMPLEMENTED)

- No vault/crypto code exists yet. When it does:
  - Cryptography lives in infrastructure services only; domain stays pure.
  - Web Crypto / vetted libraries only; fail closed; no silent downgrades.
  - Plaintext secrets: shortest practical lifetime; never logged, never in
    URLs or DOM attributes, never persisted unnecessarily.
- Error handling: throw `AppError` subclasses (src/lib/errors.js);
  `userMessage` is the only end-user-safe text; never leak secrets into
  messages or logs.
- The browser extension is a separate security boundary with explicit,
  versioned contracts (**FUTURE**).

## 6. Testing (IMPLEMENTED foundation)

Vitest 4 + Testing Library, jsdom environment. Config: `vitest.config.mjs`
(alias, esbuild JSX, setup file `src/test/setup.js`). Tests are colocated as
`src/**/*.test.{js,jsx}` (currently `src/test/foundations.test.jsx`).

Note: `@vitejs/plugin-react` is deliberately not installed — its Babel 8 peer
conflicts with the Babel 7 tree required by the `shadcn` CSS package, and
esbuild's `jsx: "automatic"` covers test transforms.

Rules: test behavior, not implementation details. Security/crypto code ships
with tests + integration verification (**PLANNED**).

## 7. Commands

```bash
npm install        # install
npm run dev        # dev server (Turbopack)
npm run lint       # ESLint
npm test           # Vitest (single run); test:watch for watch mode
npm run build      # production build
npm start          # serve production build
```

## 8. Environment variables

None required or used. Any future variable must be documented here and
prefixed per Next.js conventions (`PUBLIC_` for browser-exposed values).

## 9. Deployment strategy

**PLANNED.** Local-first product; static/server deploy target to be decided
when the application exists. No deploy configuration exists yet.

## 10. Troubleshooting

- **npm peer conflicts:** the `shadcn` package pins Babel 7; avoid adding
  packages that require Babel 8 (see §6).
- **Styles look wrong after editing globals.css:** the four token layers are
  order-dependent (§4.1); keep shadcn mappings intact.
- **ESLint deprecated warning for eslint 9.39:** upstream notice; harmless.

## 11. Documentation maintenance

If an architectural decision changes, update DEVELOPER.md in the same
change. Product scope → PRODUCT.md. Agent rules → AGENTS.md. Never leave
documentation describing an architecture that does not exist.
