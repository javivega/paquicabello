# 003 — Compress HomeHero doodle stagger timeline

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: MEDIUM
- **Category**: Easing & duration / Cohesion
- **Estimated scope**: 1 file (`HomeHero.tsx`), delay constants only

## Problem

Nine doodles stagger from **600ms to 1800ms**. Last doodle finishes ~**2300ms** after inview (`1800ms + 500ms` animation). Copy/CTAs are already on screen; the cascade feels stretched for a one-shot marketing beat. Stagger should sit in a **30–80ms** step band and not outlast the stack settle.

```tsx
/* src/components/home/HomeHero.tsx:27-74 — current delays */
const heroDoodles = [
  { /* squiggle */ delay: '600ms', ... },
  { /* heart top */ delay: '1000ms', ... },
  { /* heart bottom */ delay: '1800ms', ... },
  { /* spark 1 */ delay: '1200ms', ... },
  { /* spark 2 */ delay: '1300ms', ... },
  { /* spark 3 */ delay: '1400ms', ... },
  { /* spark 4 */ delay: '1500ms', ... },
  { /* spark 5 */ delay: '1600ms', ... },
  { /* spark 6 */ delay: '1700ms', ... },
]
```

Stack settle reference (keep in sync mentally): front animation **1200ms** with **280ms** delay → settles by ~1480ms. Doodles should finish inside or just after that window.

## Target

Compress delays into **~600–1100ms** with **~55ms** steps (within 30–80ms). Keep visual order: squiggle first (signature), then sparks, then hearts.

Exact delays to apply (by current `src` asset):

| Asset constant | New `delay` |
|---|---|
| `doodleSquiggle` | `600ms` |
| `doodleSpark4` | `655ms` |
| `doodleSpark5` | `710ms` |
| `doodleSpark6` | `765ms` |
| `doodleSpark1` | `820ms` |
| `doodleSpark2` | `875ms` |
| `doodleSpark3` | `930ms` |
| `doodleHeartTop` | `985ms` |
| `doodleHeartBottom` | `1040ms` |

Do **not** change classNames/positions — only `delay` strings.

Last doodle ends at `1040ms + 500ms = 1540ms` (aligned with stack settle).

## Repo conventions to follow

- Delays are string literals on the `heroDoodles` array in `HomeHero.tsx` (inline `style={{ animationDelay }}`).
- Animation duration stays on `.home-hero-doodle` in CSS (500ms) — do not move duration into JS in this plan.
- Exemplar of site stagger scale: text enters use 60–480ms delays via `sectionEnterStyle` in the same file — doodles may start later than text but should not drag to 1.8s+.

## Steps

1. Open `src/components/home/HomeHero.tsx`.
2. Update each `heroDoodles[].delay` to the table above (match by `src` import, not array index if order differs).
3. Optionally reorder the array to match chronological delay (readability only — not required for behavior).

## Boundaries

- Do NOT change doodle positions, sizes, or CSS keyframes in this plan.
- Do NOT change `.home-hero-doodle` duration (500ms) here.
- Do NOT change section-enter delays for heading/CTAs/credentials.
- Do NOT add dependencies.
- If delays already fall within 600–1100ms at execution time, STOP and report drift.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**:
  - Animations panel: all doodle starts between 600ms and 1040ms after play.
  - No doodle still appearing after ~1.6s.
  - Squiggle still leads; hearts still land near the end of the burst.
  - Reduced motion: doodles appear instantly (existing CSS); delays irrelevant.
- **Done when**: every `heroDoodles[].delay` matches the target table; max delay ≤ `1040ms`.
