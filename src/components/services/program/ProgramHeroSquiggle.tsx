import { useId } from 'react'

import {
  PROGRAM_SQUIGGLE_PATH,
  PROGRAM_SQUIGGLE_VIEWBOX,
} from '@/img/program/doodle-squiggle-path'
import { cn } from '@/lib/utils'

/**
 * Centerline under the filled brush — thick white stroke mask so the orange
 * silhouette writes on (left → right behind the photo row).
 */
const PROGRAM_SQUIGGLE_CENTERLINE =
  'M 25 215 C 140 190 270 168 420 160 C 560 152 700 130 830 85 C 890 60 940 35 968 22'

type ProgramHeroSquiggleProps = {
  className?: string
}

/** Inline SVG: filled brush revealed by an animated stroke mask (hand-draw). */
export function ProgramHeroSquiggle({ className }: ProgramHeroSquiggleProps) {
  const reactId = useId()
  const maskId = `program-squiggle-mask-${reactId.replace(/:/g, '')}`

  return (
    <svg
      className={cn('size-full max-w-none', className)}
      viewBox={PROGRAM_SQUIGGLE_VIEWBOX}
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
          width="976.97"
          height="319.94"
        >
          <rect width="976.97" height="319.94" fill="black" />
          <path
            data-program-squiggle-mask
            d={PROGRAM_SQUIGGLE_CENTERLINE}
            fill="none"
            stroke="white"
            strokeWidth={72}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </mask>
      </defs>
      <path
        d={PROGRAM_SQUIGGLE_PATH}
        fill="#FF4E00"
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}
