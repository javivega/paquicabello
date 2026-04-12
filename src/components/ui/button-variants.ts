import { cva } from 'class-variance-authority'

/** Offset “sticker” shadow (Figma: rgba(104,66,255,0.2) @ 4px,4px) */
const shadowPrimaryOffset =
  'shadow-[4px_4px_0px_0px_rgba(104,66,255,0.2)]' as const

export const brandButtonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-0',
    'rounded-[12px] border border-transparent outline-none select-none',
    'transition-[box-shadow,background-color,color,transform]',
    'focus-visible:ring-2 focus-visible:ring-[var(--Semantictokens-Color-Icon-Accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:translate-y-px',
  ].join(' '),
  {
    variants: {
      brandVariant: {
        primary: [
          'bg-btn-primary text-btn-primary-text',
          shadowPrimaryOffset,
          'hover:shadow-[4px_4px_0px_0px_rgba(104,66,255,0.2),0px_0px_15px_0px_rgba(117,36,0,0.21)]',
          'hover:bg-btn-primary-hover',
          'active:bg-btn-primary-active',
        ].join(' '),
        secondary: [
          'bg-btn-secondary-bg border-btn-secondary-border text-btn-secondary-text',
          'hover:shadow-[0px_0px_15px_0px_rgba(117,36,0,0.21)]',
        ].join(' '),
      },
      brandSize: {
        md: '',
        lg: '',
      },
      presentation: {
        interactive: '',
        hover: '',
      },
    },
    compoundVariants: [
      {
        brandVariant: 'primary',
        brandSize: 'md',
        class: 'p-2',
      },
      {
        brandVariant: 'primary',
        brandSize: 'lg',
        class: 'p-3',
      },
      {
        brandVariant: 'secondary',
        brandSize: 'md',
        class: 'p-2',
      },
      {
        brandVariant: 'secondary',
        brandSize: 'lg',
        class: 'px-4 py-3',
      },
    ],
    defaultVariants: {
      brandVariant: 'primary',
      brandSize: 'md',
      presentation: 'interactive',
    },
  },
)

export const iconRingVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full border-solid',
  {
    variants: {
      brandVariant: {
        primary: 'border-btn-primary-text',
        secondary: 'border-icon-brand',
      },
      brandSize: {
        md: 'border-[1.5px] p-0.5 [&_svg]:size-4',
        lg: 'border-2 p-0.5 [&_svg]:size-5',
      },
    },
    compoundVariants: [
      {
        brandVariant: 'secondary',
        brandSize: 'lg',
        class: 'size-6',
      },
    ],
    defaultVariants: {
      brandVariant: 'primary',
      brandSize: 'md',
    },
  },
)

export const labelVariants = cva('whitespace-nowrap font-semibold', {
  variants: {
    brandVariant: {
      primary: 'text-btn-primary-text',
      secondary: 'text-btn-secondary-text',
    },
    brandSize: {
      md: 'paragraph-md-bold px-1',
      lg: 'paragraph-lg-bold px-1',
    },
  },
  defaultVariants: {
    brandVariant: 'primary',
    brandSize: 'md',
  },
})

/** shadcn-style alias */
export const buttonVariants = brandButtonVariants
