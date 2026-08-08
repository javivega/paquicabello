# 009 — Fix methodology stack recess and card entry

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: HIGH
- **Category**: Physicality & origin / Purpose & frequency / Cohesion
- **Estimated scope**: 1 file (`src/components/home/HomeMethodologySection.tsx`), ScrollTrigger scrub tweens only

## Problem

The methodology pillar stack uses pin + scrub recess. Opacity fade and an early scrub window make the effect feel wrong: cards look ghosted while still fully readable, and “entry” reads as the previous card dying rather than the next arriving.

```ts
/* src/components/home/HomeMethodologySection.tsx:151-167 — current */
// Soft recess as the following card arrives — transform + opacity only.
gsap.fromTo(
  card,
  { scale: 1, opacity: 1 },
  {
    scale: 0.94,
    opacity: 0.88,
    ease: 'none',
    scrollTrigger: {
      trigger: next,
      start: 'top bottom',
      end: STACK_PIN_START,
      scrub: 0.45,
      invalidateOnRefresh: true,
    },
  },
)
```

Issues:

1. **`opacity: 0.88`** — stacked paper stays opaque; fading body copy mid-scroll washes out text and shows through to the page behind the card edges.
2. **`start: 'top bottom'`** — recess begins as soon as the next card enters the viewport, long before it covers the pin, so the front card scales/fades while alone on screen.
3. **No incoming motion** — the next card has no settle; the only motion is the previous card receding.

`STACK_PIN_START` remains `'top 96px'` (navbar clearance). Pin setup (lines 137–146) stays unchanged.

## Target

Inside the same `cards.forEach` loop, **replace** the single `fromTo` on `card` with two scrubbed tweens that share the **same** ScrollTrigger window:

**Scrub window (coverage-aligned):**

- `trigger: next`
- `start: 'top 55%'`
- `end: STACK_PIN_START` (i.e. `'top 96px'`)
- `scrub: 0.45`
- `invalidateOnRefresh: true`
- `ease: 'none'` on both tweens (required for scrub)

**Outgoing (pinned) card — scale only, no opacity:**

```ts
gsap.fromTo(
  card,
  { scale: 1 },
  {
    scale: 0.95,
    ease: 'none',
    scrollTrigger: {
      trigger: next,
      start: 'top 55%',
      end: STACK_PIN_START,
      scrub: 0.45,
      invalidateOnRefresh: true,
    },
  },
)
```

**Incoming card — short rise into place (transform only):**

```ts
gsap.fromTo(
  next,
  { y: 24 },
  {
    y: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: next,
      start: 'top 55%',
      end: STACK_PIN_START,
      scrub: 0.45,
      invalidateOnRefresh: true,
    },
  },
)
```

Exact numeric targets (do not approximate):

| Property | From | To |
| --- | --- | --- |
| Outgoing `scale` | `1` | `0.95` |
| Outgoing `opacity` | *(remove — do not animate)* | — |
| Incoming `y` | `24` (px) | `0` |
| Scrub start | `'top bottom'` | `'top 55%'` |
| Scrub end | `STACK_PIN_START` | unchanged |
| Scrub lag | `0.45` | unchanged |

Cards keep `origin-top` (already on `.method-stack-card`). Do not animate opacity on either card.

`prefers-reduced-motion: reduce` path: leave as-is (no pin/scrub created inside that matchMedia branch).

## Repo conventions to follow

- Scrubbed scroll motion uses `ease: 'none'` (see existing methodology scrub and home hero ScrollTrigger scrub).
- Animate **transform only** for recess/entry (`scale`, `y`); never `top`/`left`/`margin`.
- GSAP setup stays inside `useGSAP` + `gsap.matchMedia()` with `{ scope: sectionRef }` — same pattern as this file and `HomeHero.tsx`.
- Do not invent new CSS easing tokens for scrub.

## Steps

1. Open `src/components/home/HomeMethodologySection.tsx`. Locate the `gsap.fromTo(card, …)` block inside `cards.forEach` (currently ~lines 151–167).
2. Delete `opacity` from both the from and to vars of the outgoing tween. Change `scale` target from `0.94` to `0.95`.
3. Change that tween’s ScrollTrigger `start` from `'top bottom'` to `'top 55%'`. Keep `end: STACK_PIN_START`, `scrub: 0.45`, `ease: 'none'`, `invalidateOnRefresh: true`.
4. Immediately after that tween (still inside `if (!next) return` / after `next` is defined), add the incoming `gsap.fromTo(next, { y: 24 }, { y: 0, … })` with the **identical** ScrollTrigger config as step 3.
5. Update the comment above the tweens to: `// Recess previous card (scale only) and settle the incoming card as it covers the pin.`
6. Do not change pin `ScrollTrigger.create`, image `refresh` logic, markup, or header/`section-enter` CTAs.

## Boundaries

- Do NOT reintroduce opacity on stack cards.
- Do NOT change `STACK_PIN_START`, pin flags, or `pinSpacing`.
- Do NOT edit `SectionReveal`, `HomeHelpFlipDeck`, or global CSS.
- Do NOT add dependencies.
- If the scrub block is missing or already matches Target, STOP and report.

## Verification

- **Mechanical**: `npm run build` succeeds (`tsc -b && vite build`).
- **Feel check** (home → Metodología stack):
  - While the pinned card is alone on screen, it stays **fully opaque** and at **scale 1**.
  - Recess (scale → 0.95) only becomes obvious as the next card approaches/covers the pin (~mid viewport), not when it first peeks at the bottom.
  - Incoming card eases up ~24px into rest over that same window; no fade.
  - At 10% scrub feel (scroll slowly): no washed-out text; depth reads as scale, not transparency.
  - `prefers-reduced-motion: reduce`: static stacked list, no pin/scrub.
- **Done when**: no opacity in stack scrub tweens; scrub `start` is `'top 55%'`; outgoing scale ends at `0.95`; incoming `y` animates `24 → 0` on the same window.
