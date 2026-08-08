# 006 — Add signature squiggle draw-on (missed opportunity)

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: LOW (additive delight)
- **Category**: Missed opportunities
- **Estimated scope**: 2–3 files (`hero-doodle-squiggle.svg` and/or CSS + `HomeHero.tsx`), moderate

## Problem

Figma’s hero motion used a **pathLength / stroke reveal** on the orange squiggle. The implementation only scale-fades the filled SVG, so the signature stroke never “draws.”

```tsx
/* src/components/home/HomeHero.tsx — squiggle is a normal img in heroDoodles */
{
  src: doodleSquiggle,
  className:
    'home-hero-doodle home-hero-doodle-squiggle absolute -left-[5%] top-[61%] w-[83%] max-w-none',
  delay: '600ms',
},
```

Current asset `src/img/hero-doodle-squiggle.svg` is a **filled** path (`fill="#FF4E00"`), not a stroke — so naive `stroke-dashoffset` on the existing path will not match the brush look without work.

## Target

One-shot draw (or draw-equivalent) for the squiggle only, after the stack has begun settling:

- **Start**: ~600ms after inview (same as today’s squiggle delay, or aligned with plan 003).
- **Duration**: **700–900ms** marketing explanatory budget.
- **Easing**: `var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1))`.
- **Reduced motion**: no draw; show final opaque squiggle (opacity fade only if plan 005 exists).

Preferred techniques (pick the first that preserves the brush look):

1. **Stroke conversion**: replace/augment SVG with a stroke path that visually matches; animate `stroke-dasharray` / `stroke-dashoffset` (or SVG `pathLength={1}` style) from hidden → full.
2. **If fill must stay**: CSS `clip-path` wipe roughly along the stroke direction (left→right / path flow), 700–900ms, ease-out — not as good as true draw, but acceptable fallback.
3. **Do not** fake it with another `scale(0.65)` pop.

Inline SVG (React) is allowed if `img` cannot animate path attributes. Keep decorative: `aria-hidden` / empty alt.

## Repo conventions to follow

- Hero doodles are decorative overlays inside `HomeHeroPhoto`.
- Motion is CSS-first in this codebase; JS Motion library is **not** a dependency — do not add `motion`.
- Color must stay brand orange `#FF4E00` / `var(--Primitive-color-orange-orange-500)` / existing fill.
- Exemplar of one-shot CSS animation gated by `.home-section-reveal[data-inview='true']`: `.home-hero-doodle` block in `globals.css`.

## Steps

1. Inspect `src/img/hero-doodle-squiggle.svg`. Decide stroke vs clip-path (document choice in the PR/commit message).
2. If stroke: produce a stroke-capable SVG (new file or replace); wire as inline SVG or CSS-friendly markup in `HomeHeroPhoto` for the squiggle only (other doodles can remain `<img>`).
3. Add `@keyframes home-hero-squiggle-draw` (dashoffset or clip-path) in `globals.css`, duration **800ms**, easing `var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1))`, delay **600ms**, `both` fill mode.
4. Remove the squiggle from the generic `home-hero-doodle-in` scale animation (avoid double entrance): squiggle uses draw keyframes only; other doodles keep scale-fade.
5. Gate with the same `.home-section-reveal` pause/play pattern as other hero animations.
6. Under `prefers-reduced-motion: reduce`, skip draw; show final squiggle (opacity 1, full path visible).

## Boundaries

- Do NOT animate other doodles with pathLength — squiggle only.
- Do NOT reintroduce Figma’s infinite loop.
- Do NOT add `motion` / framer-motion / GSAP.
- Do NOT change portrait crop or stack rotates.
- If a true draw would destroy the brush silhouette, use clip-path fallback rather than shipping a thin wireframe stroke that no longer matches the design.

## Verification

- **Mechanical**: `npm run build`.
- **Feel check**:
  - Squiggle appears to draw/write on after stack starts; not a uniform scale pop.
  - Color and thickness still read as the thick orange brush from Figma.
  - Other doodles still pop with scale-fade.
  - 10% playback: dash/clip progresses along the path; no loop.
  - Reduced motion: full squiggle visible without draw.
- **Done when**: squiggle has a dedicated one-shot draw (or clip) animation; it is not using `home-hero-doodle-in` scale alone; reduced motion shows final art.
