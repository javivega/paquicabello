# 010 — Pre-hide session hero layers before GSAP

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: MEDIUM
- **Category**: Performance / physicality
- **Estimated scope**: 2 files (`globals.css`, `ServiceSessionExpressHero.tsx`), small

## Problem

Collage layers paint fully visible on first frame. Visibility is only cleared after React mounts and `useGSAP` runs `gsap.set(..., { autoAlpha: 0 })`, so users can see a one-frame flash of the finished collage before the escalate starts.

```tsx
/* src/components/services/session/ServiceSessionExpressHero.tsx:119 — current */
gsap.set('[data-session-hero-layer]', { autoAlpha: 0 })
```

HomeHero avoids this by CSS-hiding nodes before the animation:

```css
/* src/styles/globals.css:354-358 — exemplar */
.home-hero-stack-back {
  opacity: 0;
  transform-origin: center center;
  animation: home-hero-stack-back 700ms var(--ease-out) both;
  animation-delay: 120ms;
}
```

## Target

1. In CSS, hide every session hero layer on first paint:

```css
/* target — add near other marketing entrance rules in globals.css */
.session-hero-layer {
  opacity: 0;
}
```

2. Keep the existing GSAP timeline; it already animates `autoAlpha` to `1`. Do **not** remove `gsap.set` unless you verify GSAP `fromTo` with `immediateRender: true` still covers both reduced-motion and full paths — safer to keep `gsap.set` as a belt-and-suspenders.

3. Under `prefers-reduced-motion: reduce`, the existing GSAP branch already fades `autoAlpha` 0→1 in **0.18s**. CSS `opacity: 0` is the correct initial state for that path too.

## Repo conventions to follow

- Pre-hide with CSS `opacity: 0`, then animate in — same pattern as `.home-hero-stack-back` / `.home-hero-doodle` in `src/styles/globals.css`.
- Class name already on layers: `session-hero-layer` (`ServiceSessionExpressHero.tsx:70`).
- Easing token: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` in `src/styles/tokens.css` (no change needed for this plan).

## Steps

1. Open `src/styles/globals.css`. After the HomeHero reduced-motion block (around the `home-hero-*` rules, before or after the `section-enter` block), add:

```css
/* Session express hero collage — hide until GSAP reveals */
.session-hero-layer {
  opacity: 0;
}
```

2. Confirm `SessionHeroLayer` still applies `className={cn('session-hero-layer absolute', className)}` in `ServiceSessionExpressHero.tsx` (around line 70). Do not rename the class.

3. Leave the GSAP `gsap.set('[data-session-hero-layer]', { autoAlpha: 0 })` in place unless testing shows a conflict; `autoAlpha` sets both `opacity` and `visibility`, which is fine on top of the CSS default.

4. Do **not** set `opacity: 0` on the orange glow blob (the `blur-xl` div without `data-session-hero-layer`) in this plan — that is plan **015**.

## Boundaries

- Do NOT change timeline durations, staggers, or easing in this plan.
- Do NOT touch `section-enter` copy animation.
- Do NOT add dependencies.
- Do NOT pre-hide with `visibility: hidden` alone without opacity — GSAP uses `autoAlpha`.
- If `.session-hero-layer` is missing from the component when you open the file, STOP and report drift.

## Verification

- **Mechanical**: `pnpm exec tsc --noEmit` (ignore existing `baseUrl` deprecation if present). Dev server: open `/` session express route and hard-refresh.
- **Feel check**:
  - Throttle CPU to 6× slowdown in DevTools Performance; hard-refresh — collage must **not** flash fully opaque before the escalate.
  - Animations panel at 10% playback: layers start invisible, then rise in order.
  - Toggle `prefers-reduced-motion: reduce` — layers still start hidden, then opacity-fade in (~180ms).
- **Done when**: No visible flash of the finished collage on cold load; escalate still plays as before.
