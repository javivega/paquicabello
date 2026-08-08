# 015 — Fade session hero glow with the photo wave

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: LOW (additive)
- **Category**: Missed opportunities
- **Estimated scope**: 1–2 files (`ServiceSessionExpressHero.tsx`, optionally `globals.css`), small

## Problem

The orange radial glow behind the collage is always fully visible (`opacity-40`), so it sits finished while photos escalate in. That breaks the “one composition” read.

```tsx
/* src/components/services/session/ServiceSessionExpressHero.tsx:182-189 — current */
<div
  className="pointer-events-none absolute inset-[13%_15%_20%_15%] rounded-xl opacity-40 blur-xl"
  style={{
    background:
      'radial-gradient(ellipse at center, rgba(255,78,0,0.45) 0%, transparent 70%)',
  }}
  aria-hidden
/>
```

## Target

1. Mark the glow for GSAP (and optional CSS pre-hide):

```tsx
/* target markup */
<div
  data-session-hero-layer="glow"
  className="session-hero-layer pointer-events-none absolute inset-[13%_15%_20%_15%] rounded-xl blur-xl"
  style={{
    opacity: 0.4, /* final; GSAP will drive autoAlpha — see steps */
    background:
      'radial-gradient(ellipse at center, rgba(255,78,0,0.45) 0%, transparent 70%)',
  }}
  aria-hidden
/>
```

**Important:** Tailwind `opacity-40` sets `opacity: 0.4`, which fights GSAP `autoAlpha: 1`. Prefer:

- Remove `opacity-40` from className.
- Animate glow to **`autoAlpha: 0.4`** (not `1`), so the settled look matches today’s 40% glow.
- Or wrap an inner div at `opacity-40` and fade the outer wrapper `0 → 1`.

Preferred (inner locked opacity):

```tsx
<div
  data-session-hero-layer="glow"
  className="session-hero-layer pointer-events-none absolute inset-[13%_15%_20%_15%]"
  aria-hidden
>
  <div
    className="size-full rounded-xl opacity-40 blur-xl"
    style={{
      background:
        'radial-gradient(ellipse at center, rgba(255,78,0,0.45) 0%, transparent 70%)',
    }}
  />
</div>
```

Outer layer: GSAP `autoAlpha 0 → 1`. Inner: keeps visual `opacity-40`.

2. Timeline: fade glow with the first photo wave:

```tsx
/* target — in prefers-reduced-motion: no-preference timeline */
const glow = layer('glow')

tl.fromTo(
  glow,
  { autoAlpha: 0 },
  { autoAlpha: 1, duration: 0.58 },
  0.28, // same start as photo-paqui
)
```

3. Reduced motion: existing `gsap.fromTo('[data-session-hero-layer]', …)` already includes any node with `data-session-hero-layer`, so glow is covered — **verify** the selector still matches after markup change.

4. If plan **010** added `.session-hero-layer { opacity: 0 }`, glow benefits automatically.

## Repo conventions to follow

- Layer attribute: `data-session-hero-layer="…"`.
- Photo Paqui start: `0.28` / duration `0.58` — match those for glow sync.
- Ease: timeline default (plan **011** token bezier).

## Steps

1. Restructure the glow markup as the preferred outer/inner pattern above; add `data-session-hero-layer="glow"` and `session-hero-layer` on the outer wrapper.
2. In the full-motion timeline, add `glow` `fromTo` at **0.28s**, duration **0.58**, `autoAlpha` only (no `y`/`scale`).
3. Confirm `gsap.set('[data-session-hero-layer]', { autoAlpha: 0 })` still runs before the timeline (includes glow).
4. Confirm reduced-motion stagger path picks up glow.

## Boundaries

- Do NOT animate `filter: blur()` over time (keep blur static on the inner node — AUDIT: keep transition-time blur under 20px; animating blur is expensive).
- Do NOT change photo/dog/accent timing in this plan.
- Do NOT add Motion/Framer.

## Verification

- **Mechanical**: Reload; typecheck.
- **Feel check**: At 10% speed, glow appears with Paqui photo, not before squiggle and not at full strength while collage is empty. Settled frame must match previous glow strength (~40%).
- **Reduced motion**: glow opacity-fades with other layers.
- **Done when**: Glow is part of the escalate; final look matches pre-change intensity; no blur animation.
