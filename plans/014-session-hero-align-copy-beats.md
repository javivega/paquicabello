# 014 — Align session hero copy delays to collage waves

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file (`ServiceSessionExpressHero.tsx`), tiny

## Problem

Copy and collage run on separate clocks. Copy `sectionEnterStyle` delays (50 / 120 / 190 / 260ms) finish early while collage waves continue through ~700ms+, so the hero can feel like two entrances.

```tsx
/* src/components/services/session/ServiceSessionExpressHero.tsx:430-455 — current copy */
style={sectionEnterStyle(50)}   // eyebrow
style={sectionEnterStyle(120)}  // h1
style={sectionEnterStyle(190)}  // body
style={sectionEnterStyle(260)}  // CTAs
```

```tsx
/* same file:123-165 — collage wave starts (seconds) */
// squiggle @ 0.12 → photos @ 0.28 / 0.40 → dogs @ 0.52 → heart @ 0.62 → accents @ 0.70
```

## Target

Map copy beats to collage waves. Delays are in **milliseconds** for `sectionEnterStyle` (CSS animation-delay). Collage times below are the GSAP timeline positions × 1000.

| Copy | Role | Target delay | Aligns with |
|---|---|---|---|
| Eyebrow | First signal | **120ms** | Squiggle start (`0.12`) |
| Headline | Primary read | **280ms** | Photo Paqui (`0.28`) |
| Body | Support | **400ms** | Photo client (`0.40`) |
| CTA row | Action | **700ms** | Accents land (`0.70`) |

```tsx
/* target */
style={sectionEnterStyle(120)}  // eyebrow
style={sectionEnterStyle(280)}  // h1
style={sectionEnterStyle(400)}  // body
style={sectionEnterStyle(700)}  // CTAs
```

Keep `section-enter` duration as-is (`0.78s` in `globals.css`) — only delays change. Do not move collage timeline times in this plan (unless drift already changed them; then re-read collage positions and keep the mapping table logic).

## Repo conventions to follow

- Delays via `sectionEnterStyle(ms)` from `@/lib/sectionEnterStyle`.
- Stagger between related beats stays in a soft band (here ~120–160ms between copy lines; CTAs wait for collage accents — intentional).

## Steps

1. Update the four `sectionEnterStyle(...)` values in `ServiceSessionExpressHero.tsx` to **120 / 280 / 400 / 700**.
2. Do not change class names, copy, or collage GSAP.
3. If plan **012** added `session-hero-copy`, leave it; reduced-motion delays still use `--section-enter-delay`.

## Boundaries

- Do NOT retune collage durations to “match” copy.
- Do NOT convert copy to GSAP.
- Do NOT change `globals.css` `section-enter` duration.

## Verification

- **Mechanical**: Reload page.
- **Feel check**: At 25% speed — eyebrow appears with squiggle wipe; headline with first photo; body with second photo; CTAs roughly when sparks/motion marks appear. If CTAs feel late for interaction, prefer **620ms** (heart beat) instead of 700 — only if 700 clearly blocks the primary CTA; document the swap in the PR note.
- **Done when**: One shared beat map is obvious in slow motion; no code change to collage required.
