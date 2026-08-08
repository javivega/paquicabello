import { useId } from 'react'

import {
  SESSION_SQUIGGLE_PATH,
  SESSION_SQUIGGLE_VIEWBOX,
} from '@/img/session/doodle-squiggle-path'
import { cn } from '@/lib/utils'

/**
 * Centerline under the filled brush — used as a thick white stroke mask so the
 * orange silhouette “writes on” instead of wiping in as a hard clip.
 * Tuned to the session collage squiggle (bottom-left → upper-right wave).
 */
const SESSION_SQUIGGLE_CENTERLINE =
  'M 10 158 C 75 178 145 188 230 170 C 320 150 410 142 510 136 C 610 128 690 120 735 114'

type SessionHeroSquiggleProps = {
  className?: string
}

/** Inline SVG: filled brush revealed by an animated stroke mask (hand-draw). */
export function SessionHeroSquiggle({ className }: SessionHeroSquiggleProps) {
  const reactId = useId()
  const maskId = `session-squiggle-mask-${reactId.replace(/:/g, '')}`

  return (
    <svg
      className={cn('size-full max-w-none', className)}
      viewBox={SESSION_SQUIGGLE_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      overflow="visible"
      aria-hidden
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="739.805"
          height="240.823"
        >
          {/* Black = hidden; white stroke reveals the fill along the line. */}
          <rect width="739.805" height="240.823" fill="black" />
          <path
            data-session-squiggle-mask
            d={SESSION_SQUIGGLE_CENTERLINE}
            fill="none"
            stroke="white"
            strokeWidth={90}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </mask>
      </defs>
      <path
        d={SESSION_SQUIGGLE_PATH}
        fill="#FF4E00"
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}
