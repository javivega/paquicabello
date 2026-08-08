# 007 — Unify HomeHero photo timeline (missed opportunity)

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: LOW (additive / polish after fixes)
- **Category**: Missed opportunities
- **Estimated scope**: 1 file (`globals.css`), timing constants only
- **Depends on**: Plan **001** (competing photo enter removed). Prefer **003** (doodle compress) done or applied together.

## Problem

Even after removing `.section-enter-photo` from the wrapper (plan 001), the stack’s own timing is long and slightly front-loaded differently from the doodle burst:

```css
/* src/styles/globals.css:337-346 — current */
.home-hero-stack-back {
  animation: home-hero-stack-back 900ms /* ease */ both;
  animation-delay: 200ms;
}

.home-hero-stack-front {
  animation: home-hero-stack-front 1200ms /* ease */ both;
  animation-delay: 280ms;
}
```

Front settle ends ~**1480ms**. With compressed doodles (~600–1040ms start), the choreography can feel like “plates still settling while doodles already finished” or the reverse if 003 is not done. Goal: **one readable beat** — plates settle, doodles decorate, done under ~1.2–1.4s.

## Target

Keep keyframe poses (rotates/scales) identical; only retune duration/delay:

```css
/* target */
.home-hero-stack-back {
  transform-origin: center center;
  animation: home-hero-stack-back 700ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)) both;
  animation-delay: 120ms;
}

.home-hero-stack-front {
  transform-origin: center center;
  animation: home-hero-stack-front 850ms var(--ease-out, cubic-bezier(0.22, 1, 0.36, 1)) both;
  animation-delay: 160ms;
}
```

Rationale (marketing explanatory, still snappy):

- Back finishes ~**820ms**; front ~**1010ms**.
- Doodles (plan 003) occupy ~600–1540ms end — overlap the settle, finish just after plates.

Do **not** change keyframe `from`/`to` transform values in this plan (those are design-locked tilts).

If plan 002/003/004 already edited adjacent lines, only change **duration** and **animation-delay** on the two stack classes.

## Repo conventions to follow

- Hero stack rules live in `src/styles/globals.css` under “Home hero”.
- Use `var(--ease-out, …)` if plan 004 may or may not be merged.
- Exemplar of shorter marketing motion nearby: consent banner `380ms` (`globals.css:506`) — hero can be longer, but 1200ms front is more than needed once the double enter is gone.

## Steps

1. Confirm plan **001** is done (photo wrapper has no `.section-enter-photo`). If not, STOP and do 001 first.
2. Update `.home-hero-stack-back` to **700ms** duration, **120ms** delay.
3. Update `.home-hero-stack-front` to **850ms** duration, **160ms** delay.
4. Keep multi-step keyframes on `home-hero-stack-front` (0% / 30% / 100%) as-is — only the clock changes.

## Boundaries

- Do NOT change rotate/scale keyframe values.
- Do NOT reintroduce `.section-enter-photo` on the photo column.
- Do NOT edit doodle delays here (plan 003 owns those).
- Do NOT add dependencies or JS timelines.
- If durations are already ≤850ms / ≤700ms at execution, STOP and report — feel-check instead of shortening further blindly.

## Verification

- **Mechanical**: `npm run build`.
- **Feel check**:
  - Full hero sequence (text stagger + stack + doodles) should read as **one composition**, finished by ~1.4s after inview.
  - At 10% playback: back plate leads slightly; front catches up; doodles overlap the second half of the settle.
  - No second “slide in” from a parent enter class.
  - Reduced motion: still no movement (or opacity-only per plan 005); final tilts preserved.
- **Done when**: stack-back is 700ms/120ms delay; stack-front is 850ms/160ms delay; keyframe poses unchanged.
