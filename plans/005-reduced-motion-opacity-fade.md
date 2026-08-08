# 005 — Prefer opacity fade under prefers-reduced-motion for HomeHero

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: LOW
- **Category**: Accessibility
- **Estimated scope**: 1 file (`globals.css`), ~25 lines

## Problem

Reduced-motion handling hard-cuts hero motion off and jumps to the final pose. That is acceptable, but the audit bar prefers **keeping a short opacity fade** and dropping movement — not nuking all feedback.

```css
/* src/styles/globals.css:367-381 — current */
@media (prefers-reduced-motion: reduce) {
  .home-hero-stack-back,
  .home-hero-stack-front,
  .home-hero-doodle {
    animation: none !important;
    opacity: 1 !important;
  }

  .home-hero-stack-back {
    transform: rotate(-5.62deg);
  }

  .home-hero-stack-front {
    transform: rotate(6.3deg);
  }
}
```

```css
/* src/styles/globals.css:445-452 — section-enter also hard-cuts */
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

## Target

For **HomeHero-only** classes (`.home-hero-stack-*`, `.home-hero-doodle`), under `prefers-reduced-motion: reduce`:

1. Keep final transforms (settled rotates) with **no rotate/scale animation**.
2. Allow a **150–200ms opacity-only** fade-in using the site ease token (or literal `cubic-bezier(0.22, 1, 0.36, 1)` if plan 004 is not done yet).

```css
/* target */
@keyframes home-hero-reduced-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .home-hero-stack-back,
  .home-hero-stack-front,
  .home-hero-doodle {
    animation: home-hero-reduced-fade 180ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)) both !important;
  }

  .home-hero-stack-back {
    transform: rotate(-5.62deg);
  }

  .home-hero-stack-front {
    transform: rotate(6.3deg);
  }

  .home-hero-doodle {
    transform: none;
  }
}
```

**Out of scope for this plan:** rewriting the global `.section-enter*` reduced-motion block (shared across the site). Only hero-specific rules.

If `--ease-out` does not exist yet, use the fallback form above (`var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1))`) so this plan does not depend on 004 landing first. Prefer executing **004 before 005** when both are done.

## Repo conventions to follow

- Reduced-motion media queries already live next to each animation block in `globals.css`.
- Duration budget for small feedback: **125–200ms** (AUDIT tooltips/small UI); use **180ms**.
- Exemplar of keeping comprehension without movement: consent modal fade `180ms ease-out` at `globals.css:510`.

## Steps

1. Add `@keyframes home-hero-reduced-fade` (opacity only) near the other `home-hero-*` keyframes in `src/styles/globals.css`.
2. Replace the hero `prefers-reduced-motion` block with the target rules (opacity fade + static final transforms).
3. Ensure `.home-section-reveal` pause/play rules still work: when `data-inview` flips, the reduced fade should run once (same play-state gating as today). If `animation-play-state: paused` until inview would leave opacity 0 under reduced motion until inview — that is correct and desired.

## Boundaries

- Do NOT change full-motion keyframes (`home-hero-stack-back/front`, `home-hero-doodle-in`) except via other plans.
- Do NOT edit `.section-enter*` reduced-motion rules in this plan.
- Do NOT edit `HomeHero.tsx`.
- Do NOT remove final rotate transforms for the stack (design needs the tilted plates).
- Do NOT add JS `useReducedMotion` unless CSS proves insufficient — prefer CSS-only.

## Verification

- **Mechanical**: `npm run build`.
- **Feel check**:
  - DevTools → Rendering → **Emulate CSS prefers-reduced-motion: reduce**.
  - Reload `/`, scroll hero into view.
  - Confirm: no rotate/scale motion on stack or doodles; plates still end tilted; content fades in over ~180ms.
  - With reduced motion **off**, full stack + doodle motion still runs (regressions check).
  - At 10% playback under reduced motion: only opacity changes on hero motion classes.
- **Done when**: reduced-motion path uses opacity-only `home-hero-reduced-fade` (~180ms); movement keyframes do not run for `.home-hero-*`.
