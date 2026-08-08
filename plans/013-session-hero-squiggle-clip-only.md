# 013 — Session hero squiggle: clip + opacity only

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: LOW
- **Category**: Performance
- **Estimated scope**: 1 file (`ServiceSessionExpressHero.tsx`), tiny

## Problem

The squiggle entrance combines `clipPath`, `y`, and `scale` in one tween. That adds paint work and two spatial cues that fight the wipe. HomeHero’s squiggle draw is clip/draw + opacity, without a parallel rise/scale.

```tsx
/* src/components/services/session/ServiceSessionExpressHero.tsx:124-134 — current */
tl.fromTo(
  squiggle,
  { autoAlpha: 0, y: 16, scale: 0.97, clipPath: 'inset(0 100% 0 0)' },
  {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    clipPath: 'inset(0 0 0 0)',
    duration: 0.7,
  },
  0.12,
)
```

## Target

Squiggle tween properties: **`autoAlpha` + `clipPath` only**. Keep duration **0.7** and start time **0.12**. Keep ease from timeline defaults (after plan **011**: `cubic-bezier(0.22, 1, 0.36, 1)`).

```tsx
/* target */
tl.fromTo(
  squiggle,
  { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' },
  {
    autoAlpha: 1,
    clipPath: 'inset(0 0 0 0)',
    duration: 0.7,
  },
  0.12,
)
```

Photos, dogs, heart, accents: **unchanged** (they keep `y` / `scale`).

## Repo conventions to follow

- HomeHero squiggle: clip/draw + opacity; no competing `translate`+`scale` on the same element (`globals.css` `.home-hero-squiggle` / plan **006**).
- `clip-path` wipe left→right is an accepted fallback for filled squiggle SVGs (plan **006**).

## Steps

1. In `ServiceSessionExpressHero.tsx`, edit only the squiggle `fromTo` as in Target.
2. Confirm reduced-motion path still only uses `autoAlpha` (no clip) — already true; do not add clip under reduce.

## Boundaries

- Do NOT change photo/dog/heart/accent tweens.
- Do NOT change squiggle duration or position in the timeline.
- Do NOT convert the SVG to stroke-dashoffset in this plan.

## Verification

- **Mechanical**: Soft reload session express hero.
- **Feel check**: At 10% animation speed, squiggle should **wipe on** without also floating up or growing. Photos after it should still rise/scale.
- **Done when**: Squiggle `fromTo` has no `y` / `scale`; wipe still readable.
