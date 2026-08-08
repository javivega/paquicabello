# Animation plans

## HomeHero (commit **1ce9b04**) — complete

| # | Title | Severity | Status | Depends on |
|---|---|---|---|---|
| [001](./001-remove-competing-photo-enter.md) | Remove competing photo entrance | MEDIUM | DONE | — |
| [002](./002-soften-doodle-scale-in.md) | Soften doodle scale-in | MEDIUM | DONE | — |
| [003](./003-compress-doodle-stagger.md) | Compress doodle stagger | MEDIUM | DONE | — |
| [004](./004-align-hero-stack-easing-token.md) | Align stack easing token | LOW | DONE | — |
| [005](./005-reduced-motion-opacity-fade.md) | Reduced-motion opacity fade | LOW | DONE | Prefer **004** first |
| [006](./006-squiggle-draw-on.md) | Squiggle draw-on | LOW (additive) | DONE | Prefer **003** |
| [007](./007-unify-photo-timeline.md) | Unify photo timeline | LOW (additive) | DONE | **001** required; prefer **003** |

## HomeHelpFlipDeck (commit **1ce9b04**)

| # | Title | Severity | Status | Depends on |
|---|---|---|---|---|
| [008](./008-stabilize-help-deck-pose-order.md) | Stabilize help-deck pose order on navigate | MEDIUM | REVERTED | — |

## HomeMethodologySection (commit **1ce9b04**)

| # | Title | Severity | Status | Depends on |
|---|---|---|---|---|
| [009](./009-fix-methodology-stack-recess.md) | Fix methodology stack recess and card entry | HIGH | DONE | — |

## ServiceSessionExpressHero (commit **1ce9b04**) — complete

| # | Title | Severity | Status | Depends on |
|---|---|---|---|---|
| [010](./010-session-hero-layer-prehide.md) | Pre-hide collage layers before GSAP | MEDIUM | DONE | — |
| [011](./011-session-hero-ease-token.md) | Align GSAP ease to `--ease-out` | MEDIUM | DONE | — |
| [012](./012-session-hero-copy-reduced-motion.md) | Copy opacity fade under reduced motion | MEDIUM | DONE | — |
| [013](./013-session-hero-squiggle-clip-only.md) | Squiggle clip + opacity only | LOW | DONE | Prefer **011** |
| [014](./014-session-hero-align-copy-beats.md) | Align copy delays to collage waves | LOW | DONE | — |
| [015](./015-session-hero-glow-fade.md) | Fade glow with photo wave | LOW (additive) | DONE | Prefer **010** |

### Execution order (completed)

**010 → 011 → 012 → 013 → 014 → 015**
