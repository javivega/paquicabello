# 002 — Soften HomeHero doodle scale-in

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 1 file (`globals.css`), ~4 lines

## Problem

Doodles pop in from `scale(0.65)`, which reads as appearing from nothing. Emil’s bar: never `scale(0)`; entrances should start around **`scale(0.9–0.97)`** with opacity.

```css
/* src/styles/globals.css:326-334 — current */
@keyframes home-hero-doodle-in {
  from {
    opacity: 0;
    transform: scale(0.65);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## Target

```css
/* target */
@keyframes home-hero-doodle-in {
  from {
    opacity: 0;
    transform: scale(0.94);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

Keep duration and easing on `.home-hero-doodle` as-is in this plan:

```css
/* leave unless another plan changes it */
.home-hero-doodle {
  opacity: 0;
  transform-origin: center center;
  animation: home-hero-doodle-in 500ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

## Repo conventions to follow

- Hero motion keyframes live in `src/styles/globals.css` under the “Home hero” comment block (~line 299).
- Site entrance ease for similar pops: `cubic-bezier(0.22, 1, 0.36, 1)` (already on `.home-hero-doodle`).
- Exemplar of a gentle scale start nearby: `@keyframes section-enter-photo` uses `scale(0.985)` (`globals.css:396-404`).

## Steps

1. In `src/styles/globals.css`, change `home-hero-doodle-in` `from { transform: scale(0.65); }` to `scale(0.94)`.
2. Do not change doodle delays, durations, or reduced-motion rules in this plan.

## Boundaries

- Do NOT edit `HomeHero.tsx`.
- Do NOT change stack keyframes (`home-hero-stack-back` / `home-hero-stack-front`).
- Do NOT add Motion/GSAP or new dependencies.
- If `scale(0.65)` is already gone at execution time, STOP and report drift.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**:
  - Trigger hero inview; watch doodles at 10% playback.
  - Sparks/hearts/squiggle should gently appear (subtle grow), not “pop from a pin”.
  - Final settled size must match today’s end state (`scale(1)`).
  - `prefers-reduced-motion: reduce`: doodles still show at full opacity with no scale animation (existing rule).
- **Done when**: `home-hero-doodle-in` from-scale is `0.94` (within 0.9–0.97).
