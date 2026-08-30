# PRODUCT.md — Lokker

Single source of truth for **what Lokker is, why it exists, and how far its
scope reaches**. If product scope changes, update this file in the same change.

## 1. Product identity

**Lokker is a local-first personal security and digital-utility workspace**
that lets users manage credentials, bookmarks, authentication codes, privacy
utilities, secure personal data, and security health directly on their device.

The password vault is the security core, but Lokker is **not merely a
password manager**. It brings credentials, bookmarks, authentication
utilities, privacy utilities, security health, migration/portability, browser
integration, and secure personal data into one coherent local-first product.

**Positioning:** *Your vault. Your device. Your keys. Your data. Your control.*

Privacy is not a marketing claim — it is a core architectural principle.
Lokker is designed so the user's sensitive data never depends on a centralized
cloud credential authority. Any future backend is an **optional** encrypted
synchronization/coordination layer, never the plaintext authority over the
user's vault.

## 2. Vision

Create a private digital workspace where people can manage the credentials,
websites, authentication codes, sensitive information, and security tools
they rely on every day — without surrendering control of that information to
a centralized cloud provider.

## 3. Mission

Make secure digital habits easier: reduce credential friction, keep sensitive
information under the user's control, combine security and utility into one
coherent experience, and provide strong security without unnecessary
complexity — all while remaining useful without requiring users to surrender
their data to a cloud provider.

## 4. Core product principles

1. Meaningful user value over feature count.
2. Privacy is the product.
3. Security is architecture, not a bolted-on feature.
4. Local-first by default.
5. User data ownership and portability.
6. Calm and trustworthy UX; minimal friction in daily workflows.
7. No unnecessary cloud dependency. No dark patterns.
8. No feature exists merely to make the product look larger.
9. Established standards and mature technologies.
10. **Stop when the product reaches industry/enterprise-standard quality** —
    deliver a trustworthy, useful, maintainable product and ship. Avoid
    endless hardening, speculative abstractions, premature optimization,
    and feature creep.

## 5. Product areas

> Status rule: almost everything below is **PLANNED or FUTURE** at the current
> foundation stage. See DEVELOPER.md for what actually exists (IMPLEMENTED).

### A. Credential management (PLANNED)

- Password vault: logins, secure notes, credit cards, personal identities,
  TOTP secrets where applicable
- Password generation with **multiple generation strategies** (passphrases,
  character-based, patterned) — not a single "random button"
- Password history, favorites, search, categories with nesting
- Categories are a cross-product organizational primitive (§7), not a
  password-only concept

### B. Bookmark management (PLANNED)

A proper bookmark manager: save, organize, nested categories, favorites,
search, website metadata.

**Product principle — manage a website once.** A website should not
unnecessarily exist as two disconnected records. Where appropriate,
credentials and bookmarks maintain a relationship: creating a login for
example.com may create/update its bookmark representation; creating a
bookmark may optionally create a corresponding credential entry with empty
credentials. The exact mechanism is a later domain/application decision,
but this product intent is preserved here.

### C. Authentication utilities (PLANNED)

- TOTP / 2FA authenticator with one-time code generation, countdown timers,
  one-click copying
- WebAuthn / passkey-based vault unlock
- Recovery mechanisms

These are part of Lokker's security utility ecosystem, not unrelated features.

### D. Security health (PLANNED)

Continuous, actionable insight into the security state of stored credentials
— without fear-mongering or forced behavior:

- Weak / reused password detection, password age
- Credential-level findings, security health overview and score where meaningful
- Have I Been Pwned checks via privacy-preserving k-anonymity
- Recommendations connected to actual remediation actions

Rules: actionable over cosmetic. Do **not** recommend arbitrary rotation
merely because a password is old.

### E. Privacy utilities (FUTURE, carefully bounded)

- Masked email / privacy-friendly email workflows
- Temporary email only as a possible future capability — evaluated for
  privacy/security implications first. Lokker does not build email
  infrastructure; a required external provider must never weaken Lokker's
  privacy principles.

### F. Secure personal data (PLANNED, bounded)

Secure notes, credit cards, personal identities, TOTP secrets, encrypted
files, and other carefully scoped sensitive personal data. Guiding rule: if
the information is sensitive and users reasonably need a secure local place
for it, it may belong in Lokker. **Lokker is not an "everything app"** (§9).

### G. Import / export / portability (PLANNED)

Portability is first-class. Imports from common sources where technically and
legally appropriate: browsers (Chrome, Firefox), CSV, JSON, established
managers (Bitwarden, 1Password where supported) — with preview, validation,
duplicate detection, conflict resolution, and clear results.

Exports: (1) encrypted full-vault export, (2) full backup including user
configuration where appropriate, (3) plain/un-encrypted export for
interoperability. **Plain export is a sensitive operation**: explicit
warnings, deliberate confirmation, never treated as equivalent in safety to
encrypted export.

Philosophy: *the user owns their data and must always have a practical way
to recover and move it.*

### H. Browser extension (PLANNED)

Autofill, save/update-credential prompts, login-field detection, website
verification, dismissible contextual autofill controls, secure
extension↔vault communication, bookmark/credential relationship support.
The extension is contextual, never intrusive — it must not continuously
obstruct websites with unrequested UI.

### I. Dashboard (PLANNED)

A useful, non-decorative dashboard answering: *"What is the state of my
digital security and vault right now?"* — total credentials/bookmarks,
security health, weak/reused counts, recent activity, category distribution,
authenticator count, backup status. Charts only when they genuinely improve
understanding. Never exposes secrets unnecessarily.

## 6. Local-first principle (fundamental)

- The user's device is the primary data authority.
- Sensitive data stays local whenever possible.
- The architecture never requires users to trust Lokker with plaintext
  credentials.
- Future cloud functionality is designed around encrypted data and
  zero-knowledge principles; the backend is optional infrastructure for
  encrypted synchronization — never the authority over plaintext credentials.

## 7. Cross-product concepts

- **Categories:** nested, usable across credentials, bookmarks, notes, and
  other vault objects; integrated with search/filters; favorites where
  appropriate.
- **Favorites:** a cross-entity concept, not per-feature ad-hoc.

## 8. Information surfaces (do not merge)

**A. Marketing / landing experience** — attracts and builds trust: why
Lokker exists, philosophy, high-level privacy/security architecture,
capability demonstrations.

**B. Feature guide / product documentation** — teaches: what each feature
does, workflows, security behavior, imports/exports, extension behavior,
recovery, privacy architecture.

Marketing attracts. The Feature Guide teaches. They are distinct surfaces.

**Routing boundary (PLANNED):** public marketing routes live at the root
(`/`, `/features`, `/security`, `/privacy`, `/guide`, `/pricing`,
`/download`, `/docs`, `/about`) under the `(marketing)` route group; the
product workspace lives under `/app` (`/app/vault`, `/app/bookmarks`,
`/app/authenticator`, `/app/security`, `/app/generator`, `/app/settings`,
…) under the `(app)/app` route-group structure. Route-group names never
appear in URLs. Shared primitives (design tokens, shadcn/ui, typography,
generic components) are reused — **the design system, not the product
surface**. Marketing must not become the application; the application must
not contain a second marketing website. Authentication/authorization layers
are introduced only when the product architecture actually requires them.

**SEO:** marketing pages are the SEO-facing surfaces (proper metadata,
semantic HTML, structured data, sitemap/robots when ready). `/app` is not
an SEO surface; private/user-specific content is never exposed to search
engines.

## 9. Product scope boundary

The boundary is: **personal security, credential management, privacy
utilities, secure personal data, and browser productivity.**

Good future features strengthen one or more of these areas. Features that
are unrelated are rejected, even when technically possible. Lokker must not
become an arbitrary utility platform or an "everything app."

## 10. Target users

People who want serious, local control over their digital security without
handing their data to a cloud provider: privacy-conscious individuals,
technical users, and professionals who care where their data lives.

## 11. Design language (summary)

Full tokens: `src/app/globals.css`; rules: AGENTS.md; details: DEVELOPER.md §4.

- **Dark-first.** Very dark slate/charcoal with subtly separated surface
  levels; never pure black. An independently designed light theme shares the
  same semantic token names.
- **Trust blue** accent; restrained, accessible semantic status colors.
- **Tactile, not decorative:** depth from surface hierarchy, 1px borders,
  inset highlights, restrained shadows, hover/pressed states, spacing.
  No gradients, glassmorphism, blobs, or cybersecurity gimmicks.
- **shadcn/ui is the component foundation.**
- **Motion is functional** (~120/180/280 ms), always respecting
  `prefers-reduced-motion`.

## 12. Definition of success

Lokker succeeds when:

1. Users trust it with sensitive digital information.
2. Users manage passwords, bookmarks, authentication codes, and related
   security utilities faster than maintaining disconnected tools.
3. Browser integration makes daily credential workflows easier.
4. Security health gives users actionable insight.
5. Users can import and export their data without lock-in.
6. Users understand where their data lives.
7. A security reviewer can understand and trust the architecture.
8. The codebase can evolve toward optional encrypted sync without a
   fundamental rewrite.
9. The product remains maintainable without endless architectural
   complexity.

## 13. Current development stage

**Foundation + design system (pre-product).** The design language, token
system, project architecture, and documentation governance exist. No product
feature is implemented yet; nearly all capabilities above are PLANNED or
FUTURE (see DEVELOPER.md for the status ledger).
