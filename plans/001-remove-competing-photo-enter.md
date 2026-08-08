# 001 — Remove competing photo entrance on HomeHero

- **Status**: DONE
- **Commit**: 1ce9b04
- **Severity**: MEDIUM
- **Category**: Purpose & frequency / Physicality
- **Estimated scope**: 1 file (`HomeHero.tsx`), ~5 lines

## Problem

The hero photo runs **two nested entrances** at once. The wrapper uses the site-wide `.section-enter-photo` rise (translate + slight scale), while children run `.home-hero-stack-back` / `.home-hero-stack-front` (rotate + scale). Nested transforms muddy the stack settle and stretch the photo’s motion past ~1.5s.

```tsx
/* src/components/home/HomeHero.tsx:244-249 — current */
        <div
          style={enterPhoto}
          className="section-enter-photo relative w-full min-w-0 shrink-0 lg:w-[min(100%,530px)] lg:max-w-[50%]"
        >
          <HomeHeroPhoto />
        </div>
```

```css
/* src/styles/globals.css:421-423 — wrapper animation */
.section-enter-photo {
  animation: section-enter-photo 0.92s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--section-enter-delay, 0ms);
}
```

```css
/* src/styles/globals.css:343-346 — child animation (also transforms) */
.home-hero-stack-front {
  transform-origin: center center;
  animation: home-hero-stack-front 1200ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 280ms;
}
```

## Target

Photo wrapper is a **layout-only** container. Stack keyframes own all photo motion. No `.section-enter-photo` and no `enterPhoto` / `sectionEnterStyle(200)` on that wrapper.

```tsx
/* target */
        <div className="relative w-full min-w-0 shrink-0 lg:w-[min(100%,530px)] lg:max-w-[50%]">
          <HomeHeroPhoto />
        </div>
```

Also remove the unused module constant:

```tsx
/* delete from HomeHero.tsx */
const enterPhoto = sectionEnterStyle(200)
```

## Repo conventions to follow

- Hero-specific motion lives in `.home-hero-*` classes in `src/styles/globals.css`.
- Site `.section-enter*` is for text/CTA/credential stagger — keep those on copy, not on the photo stack.
- Exemplar of layout-only media wrapper without enter class: keep the same width classes already on the div; only strip animation class/style.

## Steps

1. In `src/components/home/HomeHero.tsx`, delete `const enterPhoto = sectionEnterStyle(200)`.
2. Replace the photo wrapper with a plain layout div (no `style={enterPhoto}`, no `section-enter-photo`).
3. Leave `.home-hero-stack-back` / `.home-hero-stack-front` animations unchanged in this plan (timing tweaks are other plans).

## Boundaries

- Do NOT edit `src/styles/globals.css` in this plan (no deletion of `.section-enter-photo` globally — other pages may use it).
- Do NOT change `HomeHeroPhoto` markup or stack keyframes.
- Do NOT change text/CTA/credential `.section-enter` staggers.
- Do NOT add dependencies.
- If the wrapper no longer uses `enterPhoto` / `section-enter-photo` at the stamped commit, STOP and report drift.

## Verification

- **Mechanical**: `npm run build` succeeds.
- **Feel check**:
  - Load `/` with the hero in view (or scroll into view once).
  - Confirm the photo stack still settles (back plate rotates one way, front the other).
  - Confirm the photo wrapper does **not** also slide in from the right / scale up as a second motion.
  - Animations panel at 10%: only `home-hero-stack-*` (and doodles) run on the figure; no `section-enter-photo` on the photo column.
  - `prefers-reduced-motion: reduce`: stack snaps to final rotates per existing CSS; no double motion.
- **Done when**: photo column has no `section-enter-photo` / `enterPhoto`; stack settle remains the only photo entrance.
