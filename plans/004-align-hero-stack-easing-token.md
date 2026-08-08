# 004 — Align HomeHero stack easing with site token

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 2 files (`tokens.css` or `globals.css` + stack rules), small

## Problem

Stack settle uses a **near-duplicate** ease that nothing else uses, while the rest of marketing motion shares one curve.

```css
/* src/styles/globals.css:339 — stack (orphan curve) */
animation: home-hero-stack-back 900ms cubic-bezier(0.16, 1, 0.3, 1) both;

/* src/styles/globals.css:345 */
animation: home-hero-stack-front 1200ms cubic-bezier(0.16, 1, 0.3, 1) both;

/* src/styles/globals.css:417 — site standard */
animation: section-enter-rise 0.78s cubic-bezier(0.22, 1, 0.36, 1) both;
```

Two hand-typed easings that almost match fracture cohesion.

## Target

1. Add a shared token matching **existing site usage** (extend conventions; do not invent a third curve):

```css
/* add to :root in src/styles/tokens.css (or :root in globals.css if tokens file has no motion section) */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```

2. Point stack (and prefer doodle) animations at the token:

```css
/* target */
.home-hero-stack-back {
  transform-origin: center center;
  animation: home-hero-stack-back 900ms var(--ease-out) both;
  animation-delay: 200ms;
}

.home-hero-stack-front {
  transform-origin: center center;
  animation: home-hero-stack-front 1200ms var(--ease-out) both;
  animation-delay: 280ms;
}

.home-hero-doodle {
  opacity: 0;
  transform-origin: center center;
  animation: home-hero-doodle-in 500ms var(--ease-out) both;
}
```

Optional in the same PR (same token only — do not rewrite every section-enter unless trivial): leave `.section-enter*` literals as-is **or** swap them to `var(--ease-out)` if the edit is mechanical and low-risk. **Required** scope is hero stack + doodle only.

## Repo conventions to follow

- Design tokens live in `src/styles/tokens.css`; semantic/primitive color vars already use `--Semantictokens-*` / `--Primitive-*`.
- Site motion already standardizes on `cubic-bezier(0.22, 1, 0.36, 1)` in `globals.css` (section-enter, consent banner).
- Exemplar: `.section-enter` at `globals.css:416-418`.
- Do **not** introduce AUDIT’s alternate `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` — that would fork the product’s established curve.

## Steps

1. Add `--ease-out: cubic-bezier(0.22, 1, 0.36, 1);` to `:root` in `src/styles/tokens.css` (confirm `:root` / `:root, .dark` pattern used there and place beside other global vars).
2. In `src/styles/globals.css`, replace `cubic-bezier(0.16, 1, 0.3, 1)` on `.home-hero-stack-back` and `.home-hero-stack-front` with `var(--ease-out)`.
3. Replace `cubic-bezier(0.22, 1, 0.36, 1)` on `.home-hero-doodle` with `var(--ease-out)`.
4. Grep for `0.16, 1, 0.3, 1` and confirm it is gone from the repo (or only remains if intentionally documented elsewhere).

## Boundaries

- Do NOT change keyframe percentages, durations, or delays in this plan.
- Do NOT change `HomeHero.tsx`.
- Do NOT add a motion library.
- Do NOT replace the site curve with `0.23, 1, 0.32, 1`.
- If `--ease-out` already exists with a different value, STOP and report — do not silently overwrite.

## Verification

- **Mechanical**: `npm run build`; grep shows no `cubic-bezier(0.16, 1, 0.3, 1)` on hero stack rules.
- **Feel check**:
  - Stack settle should feel the same family as text rise (strong ease-out, responsive start).
  - At 10% playback, no obvious “different physics” between heading enter and stack settle.
  - Reduced motion unchanged.
- **Done when**: `--ease-out` exists; stack + doodle animations use `var(--ease-out)`; orphan `0.16, 1, 0.3, 1` removed from those rules.
