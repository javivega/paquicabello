# 012 — Session hero copy: opacity fade under reduced motion

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 2 files (`globals.css`, `ServiceSessionExpressHero.tsx`), small

## Problem

On the same hero, collage respects reduced motion with a short opacity fade, but copy uses global `.section-enter`, which hard-cuts to final state:

```tsx
/* src/components/services/session/ServiceSessionExpressHero.tsx:91-100 — collage (good) */
mm.add('(prefers-reduced-motion: reduce)', () => {
  gsap.fromTo(
    '[data-session-hero-layer]',
    { autoAlpha: 0 },
    {
      autoAlpha: 1,
      duration: 0.18,
      stagger: 0.02,
      ease: HERO_EASE,
    },
  )
})
```

```tsx
/* same file:430-455 — copy still uses section-enter */
<p style={sectionEnterStyle(50)} className="section-enter …">
…
<h1 style={sectionEnterStyle(120)} className="section-enter …">
```

```css
/* src/styles/globals.css:480-487 — global hard-cut */
@media (prefers-reduced-motion: reduce) {
  .section-enter,
  .section-enter-photo,
  .section-enter-fade {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

HomeHero already solved this for its own classes with `home-hero-reduced-fade` at **180ms** + `var(--ease-out)` (`globals.css:394-399`).

## Target

**Scoped to this hero only** — do not change global `.section-enter` reduced-motion behavior (other pages depend on it).

1. Add a session-hero copy class that under reduced motion plays an opacity-only fade matching the collage (**180ms**, site ease).

```css
/* target — globals.css */
@keyframes session-hero-copy-reduced-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .session-hero-copy.section-enter {
    animation: session-hero-copy-reduced-fade 180ms var(--ease-out) both !important;
    /* Keep delay from --section-enter-delay so stagger remains gentle */
    animation-delay: var(--section-enter-delay, 0ms) !important;
    transform: none !important;
  }
}
```

2. On the four copy nodes in `ServiceSessionExpressHero.tsx` (eyebrow, h1, body, CTA row), add `session-hero-copy` alongside `section-enter`. Keep `sectionEnterStyle(...)` delays.

Normal motion: unchanged `section-enter-rise`. Reduced motion: opacity fade only, no translate.

## Repo conventions to follow

- Exemplar: `home-hero-reduced-fade` + `@media (prefers-reduced-motion: reduce)` in `globals.css:394-399` (after plan 005).
- Duration: **180ms** (same as collage GSAP `duration: 0.18` and HomeHero reduced fade).
- Easing: `var(--ease-out)` → `cubic-bezier(0.22, 1, 0.36, 1)`.

## Steps

1. Add the keyframes + media query to `src/styles/globals.css` near the existing `section-enter` reduced-motion block. The more specific `.session-hero-copy.section-enter` rule must win over the hard-cut on `.section-enter` — place it **after** the global reduce block, or increase specificity as shown.

2. In `ServiceSessionExpressHero.tsx`, update the four copy wrappers:

```tsx
className="section-enter session-hero-copy …"
```

Apply to: eyebrow `<p>`, `<h1>`, body `<p>`, CTA `<div>` — not the collage.

3. Do not change GSAP reduced-motion branch.

## Boundaries

- Do NOT rewrite global `.section-enter` reduced-motion for the whole site in this plan.
- Do NOT remove `sectionEnterStyle` delays.
- Do NOT animate copy with GSAP here.
- If specificity loses to `animation: none !important` on `.section-enter`, use:

```css
@media (prefers-reduced-motion: reduce) {
  .session-hero-copy.section-enter {
    animation: session-hero-copy-reduced-fade 180ms var(--ease-out) both !important;
    animation-delay: var(--section-enter-delay, 0ms) !important;
    opacity: unset !important; /* allow keyframes to drive opacity */
    transform: none !important;
  }
}
```

(Global rule sets `opacity: 1 !important`, which blocks keyframes — override with `opacity: unset !important` or omit the global opacity override by not using `section-enter` under reduce. Prefer `opacity: unset !important` so the fade keyframes work.)

## Verification

- **Mechanical**: Reload session express page; typecheck.
- **Feel check**:
  - Default: copy still rises with stagger.
  - Rendering → `prefers-reduced-motion: reduce`: copy **fades in** over ~180ms (with delays), no vertical travel; collage still opacity-fades. No instant pop of headline.
- **Done when**: Under reduced motion, copy and collage both use short opacity feedback; under normal motion, copy behavior unchanged.
