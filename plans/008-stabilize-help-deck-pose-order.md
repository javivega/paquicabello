# 008 — Stabilize help-deck pose order on navigate

- **Status**: REVERTED
- **Commit**: 1ce9b04
- **Severity**: MEDIUM
- **Category**: Cohesion & tokens / Physicality & origin (spatial consistency)
- **Estimated scope**: 1 file (`src/components/home/HomeHelpFlipDeck.tsx`), pose constants + navigate settle

## Problem

Deck navigation morphs the **active** card through an index-keyed pose table whose signs and magnitudes do not form a readable sequence. Going next (0→1→2…) swings the same front card:

| Index | rotate | Δ from previous |
| --- | --- | --- |
| 0 | −2.28° | — |
| 1 | +3.64° | ~5.9° flip of lean |
| 2 | −5.57° | ~9.2° |
| 3 | +4.8° | ~10.4° |
| 4 | −3.9° | ~8.7° |
| 5 | +2.1° | ~6.0° |

```ts
/* src/components/home/HomeHelpFlipDeck.tsx:94-130 — current */
const CARD_POSES = [
  { rotate: -2.28, x: 0, y: 0 },
  { rotate: 3.64, x: 10, y: -4 },
  { rotate: -5.57, x: -12, y: 6 },
  { rotate: 4.8, x: 14, y: 4 },
  { rotate: -3.9, x: -8, y: -6 },
  { rotate: 2.1, x: 6, y: 8 },
] as const

const activePose = CARD_POSES[activeIndex % CARD_POSES.length]
const peekPoses = [
  CARD_POSES[(activeIndex + 1) % CARD_POSES.length],
  CARD_POSES[(activeIndex + 2) % CARD_POSES.length],
]
```

The active wrapper then **CSS-transitions** into that new pose (`duration-500`):

```tsx
/* src/components/home/HomeHelpFlipDeck.tsx:275-277 — current */
<div
  className="relative z-10 h-[446px] w-[min(400px,88%)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[var(--ease-out)]"
  style={{ transform: poseTransform(activePose) }}
>
```

Peek cards also remount with `key={\`${activeIndex}-peek-${i}\`}`, so their transforms jump instead of reading as a stable stack behind the front card.

**Why it feels wrong:** next/prev should feel like advancing a deck (content changes; stack stays coherent). Instead the front card’s lean teleports through an unordered fan, so rotation order does not match navigation order.

## Target

1. **Fixed deck geometry** (not index-keyed for the active card):
   - Active (front): always `{ rotate: -1.2, x: 0, y: 0 }`
   - Peek deeper (z lower): always `{ rotate: -4.5, x: -10, y: 6 }`
   - Peek mid: always `{ rotate: 3.8, x: 8, y: -2 }`

2. **Directional settle on navigate** (spatial consistency with next/prev):
   - Track `navDirection`: `1` for next / forward dots, `-1` for previous.
   - On index change, set a one-shot settle offset then clear it after the transition:
     - Enter from `translateX(12px * navDirection)` → `translateX(0)` (combined with the stable active rotate).
   - Duration **250ms** (UI-ish nav, under 300ms), easing **`var(--ease-out)`** which is already `cubic-bezier(0.22, 1, 0.36, 1)` in `src/styles/tokens.css`.
   - Under `prefers-reduced-motion: reduce` / `motion-reduce:`: no settle offset (instant content swap only).

3. **Stable peek keys**: `key={\`peek-${i}\`}` (not tied to `activeIndex`) so peeks do not remount on every navigate.

4. **Remove** `CARD_POSES` index mapping for active/peeks. Replace with the three named constants above.

Exact helpers to land:

```ts
const POSE_ACTIVE = { rotate: -1.2, x: 0, y: 0 } as const
const POSE_PEEK_MID = { rotate: 3.8, x: 8, y: -2 } as const
const POSE_PEEK_BACK = { rotate: -4.5, x: -10, y: 6 } as const

function poseTransform(
  pose: { rotate: number; x: number; y: number },
  settleX = 0,
) {
  return `translate(${pose.x + settleX}px, ${pose.y}px) rotate(${pose.rotate}deg)`
}
```

Active wrapper transition classes become:

```tsx
className={cn(
  'relative z-10 h-[446px] w-[min(400px,88%)]',
  'motion-safe:transition-transform motion-safe:duration-250 motion-safe:ease-[var(--ease-out)]',
)}
style={{ transform: poseTransform(POSE_ACTIVE, settleX) }}
```

`settleX` flow in `goTo`:

```ts
function goTo(index: number, direction: 1 | -1) {
  // …existing flip reset…
  const next = (index + count) % count
  if (next === activeIndex) return
  setNavDirection(direction)
  setSettleX(12 * direction)
  setActiveIndex(next)
  // after paint: clear settle so transition runs to 0
  requestAnimationFrame(() => {
    requestAnimationFrame(() => setSettleX(0))
  })
}
```

Prev button: `goTo(activeIndex - 1, -1)`. Next: `goTo(activeIndex + 1, 1)`. Dot at index `i`: `goTo(i, i > activeIndex ? 1 : -1)` (if `i === activeIndex`, no-op).

Peek map:

```tsx
;[POSE_PEEK_BACK, POSE_PEEK_MID].map((pose, i) => (
  <div key={`peek-${i}`} style={{ zIndex: i + 1, transform: poseTransform(pose) }} … />
))
```

## Repo conventions to follow

- Easing: reuse `--ease-out` from `src/styles/tokens.css` (do **not** invent a new bezier).
- Transform-only motion (no `top`/`left`/`margin`).
- `motion-safe:` / reduced-motion already used on this component’s transitions — keep that pattern.
- Flip (`rotateY`) GSAP timeline is out of scope; only 2D deck pose + navigate settle.

## Steps

1. In `src/components/home/HomeHelpFlipDeck.tsx`, delete `CARD_POSES` and replace with `POSE_ACTIVE`, `POSE_PEEK_MID`, `POSE_PEEK_BACK` as in Target.
2. Update `poseTransform` to accept optional `settleX` (default `0`).
3. Add state: `settleX` (number, default `0`). Remove `activePose` / `peekPoses` derived from `activeIndex`.
4. Rewrite `goTo` to accept `direction: 1 | -1`, apply settle-from-offset then rAF-clear to `0`, and keep existing flip-reset behavior (`flipTween` kill, `setFlipped(false)`, GSAP reset still via `activeIndex` `useGSAP` deps).
5. Wire prev → `goTo(activeIndex - 1, -1)`, next → `goTo(activeIndex + 1, 1)`, dots → directional `goTo` as above.
6. Active wrapper: always `poseTransform(POSE_ACTIVE, settleX)`; duration class `duration-250` (Tailwind) with `ease-[var(--ease-out)]`.
7. Peeks: fixed poses + stable `key={`peek-${i}`}`. Drop `activeIndex` from peek keys.
8. If `motion-reduce` users still see settle: gate by only setting `settleX` when `window.matchMedia('(prefers-reduced-motion: no-preference)').matches` inside `goTo`.

## Boundaries

- Do NOT change flip GSAP timeline timings, face markup, or situation copy.
- Do NOT change `HomeHelpSection.tsx` or global CSS tokens unless `duration-250` is unavailable (it is standard in Tailwind v4).
- Do NOT reintroduce per-index `CARD_POSES` for the active card.
- Do NOT add dependencies.
- If the file no longer has `CARD_POSES` / the navigate buttons, STOP and report drift.

## Verification

- **Mechanical**: `npm run build` (tsc + vite) succeeds.
- **Feel check**:
  - Click **next** repeatedly: front card tilt stays ~−1.2°; content advances; card eases in from the right (~12px), not a random lean swap.
  - Click **prev**: same stable tilt; settle from the left.
  - Peek stack behind stays the same two leans (left-back / right-mid) across all indices.
  - At 10% animation speed: settle is a short horizontal ease, not a rotate flip of the front card.
  - `prefers-reduced-motion: reduce`: no settle offset; content still swaps; flip reduced path unchanged.
- **Done when**: active card no longer uses `CARD_POSES[activeIndex]`; peeks use fixed poses + stable keys; next/prev settle direction matches navigation.
