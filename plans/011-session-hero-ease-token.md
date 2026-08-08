# 011 — Align session hero GSAP ease to `--ease-out`

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file (`ServiceSessionExpressHero.tsx`), tiny

## Problem

The collage timeline uses GSAP’s built-in `power3.out`, documented as an approximation of the site token. Copy on the same hero and HomeHero CSS entrances use the real curve.

```tsx
/* src/components/services/session/ServiceSessionExpressHero.tsx:31-32 — current */
/** Soft ease-out — closest built-in to `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`. */
const HERO_EASE = 'power3.out'
```

```tsx
/* same file:99 and :121 — uses HERO_EASE */
ease: HERO_EASE,
// …
const tl = gsap.timeline({ defaults: { ease: HERO_EASE, force3D: true } })
```

```css
/* src/styles/tokens.css:5 — source of truth */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```

## Target

Use the exact site cubic-bezier string as the GSAP ease (GSAP accepts `"cubic-bezier(...)"` as an ease string):

```tsx
/* target */
/** Site motion token — `src/styles/tokens.css` `--ease-out`. */
const HERO_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
```

Do **not** introduce a second token value. Do **not** switch to AUDIT.md’s alternate `cubic-bezier(0.23, 1, 0.32, 1)` — this repo already standardized on `0.22, 1, 0.36, 1`.

Optional (not required): resolve from CSS at runtime:

```tsx
const HERO_EASE =
  getComputedStyle(document.documentElement)
    .getPropertyValue('--ease-out')
    .trim() || 'cubic-bezier(0.22, 1, 0.36, 1)'
```

Prefer the literal constant for predictability (matches how `section-enter` inlines the same bezier in `globals.css`).

## Repo conventions to follow

- Token lives in `src/styles/tokens.css` as `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.
- HomeHero CSS: `animation: … var(--ease-out) both` in `globals.css`.
- `section-enter` literals: `0.78s cubic-bezier(0.22, 1, 0.36, 1)` in `globals.css:451-452`.

## Steps

1. In `ServiceSessionExpressHero.tsx`, replace the `HERO_EASE` constant and comment:

```tsx
/** Site motion token — matches `--ease-out` in `src/styles/tokens.css`. */
const HERO_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'
```

2. Leave all `ease: HERO_EASE` call sites unchanged (reduced-motion fade + timeline defaults).

3. Do not add CustomEase plugin or new dependencies.

## Boundaries

- Do NOT change durations, delays, staggers, or properties (`y`, `scale`, `clipPath`).
- Do NOT edit `tokens.css` unless `--ease-out` is missing (it is not).
- Do NOT “fix” other files’ `power2` / `power3` easings in this plan.

## Verification

- **Mechanical**: Typecheck / soft reload of the session express page.
- **Feel check**: In Animations / GSAP DevTools-style slow scrub, entrances should feel slightly snappier at the start than `power3.out` (more like HomeHero stack). Side-by-side with HomeHero if unsure.
- **Done when**: No `power3.out` remains in this file; ease string equals the token bezier exactly.
