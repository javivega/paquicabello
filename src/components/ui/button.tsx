import { Button as ButtonPrimitive } from '@base-ui/react/button'
import type { VariantProps } from 'class-variance-authority'
import { ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

import {
  brandButtonVariants,
  iconRingVariants,
  labelVariants,
} from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

type BrandVariant = VariantProps<typeof brandButtonVariants>['brandVariant']
type BrandSize = VariantProps<typeof brandButtonVariants>['brandSize']

type BrandChromeProps = VariantProps<typeof brandButtonVariants> & {
  className?: string
  leftSlot?: ReactNode | null
  rightSlot?: ReactNode | null
  /** When false, left icon skips the circular ring (e.g. WhatsApp glyph). */
  leftSlotRing?: boolean
  presentation?: 'interactive' | 'hover'
  children?: ReactNode
}

function BrandButtonLabel({
  brandVariant: brandVariantProp,
  brandSize: brandSizeProp,
  children,
}: {
  brandVariant?: BrandVariant
  brandSize?: BrandSize
  children: ReactNode
}) {
  const brandVariant = brandVariantProp ?? 'primary'
  const brandSize = brandSizeProp ?? 'md'
  return (
    <span
      className={labelVariants({ brandVariant, brandSize })}
      data-part="label"
    >
      {brandVariant === 'secondary' && brandSize === 'md' ? (
        <span className="inline-flex h-5 items-center px-2">{children}</span>
      ) : brandVariant === 'secondary' && brandSize === 'lg' ? (
        <span className="inline-flex items-center px-2">{children}</span>
      ) : (
        children
      )}
    </span>
  )
}

function brandButtonClassName({
  brandVariant,
  brandSize,
  presentation,
  className,
}: Pick<
  BrandChromeProps,
  'brandVariant' | 'brandSize' | 'presentation' | 'className'
>) {
  return cn(
    brandButtonVariants({
      brandVariant,
      brandSize,
      presentation,
    }),
    presentation === 'hover' &&
      brandVariant === 'primary' &&
      '!shadow-[4px_4px_0px_0px_rgba(104,66,255,0.2),0px_0px_15px_0px_rgba(117,36,0,0.21)]',
    presentation === 'hover' &&
      brandVariant === 'secondary' &&
      '!shadow-[0px_0px_15px_0px_rgba(117,36,0,0.21)]',
    className,
  )
}

function resolveSlot(slot: ReactNode | null | undefined) {
  if (slot === null) return null
  if (slot === undefined) {
    return <ArrowUpRight aria-hidden strokeWidth={1.5} />
  }
  return slot
}

function BrandButtonChrome({
  brandVariant = 'primary',
  brandSize = 'md',
  leftSlot,
  rightSlot,
  leftSlotRing = true,
  children,
}: Pick<
  BrandChromeProps,
  | 'brandVariant'
  | 'brandSize'
  | 'leftSlot'
  | 'rightSlot'
  | 'leftSlotRing'
  | 'children'
>) {
  const left = resolveSlot(leftSlot)
  const right = resolveSlot(rightSlot)

  return (
    <>
      {left != null ? (
        <span
          className={
            leftSlotRing
              ? iconRingVariants({ brandVariant, brandSize })
              : 'inline-flex shrink-0 items-center justify-center p-0.5 [&_svg]:size-4'
          }
          data-part="icon-left"
        >
          {left}
        </span>
      ) : null}
      {children != null ? (
        <BrandButtonLabel brandVariant={brandVariant} brandSize={brandSize}>
          {children}
        </BrandButtonLabel>
      ) : null}
      {right != null ? (
        <span
          className={iconRingVariants({ brandVariant, brandSize })}
          data-part="icon-right"
        >
          {right}
        </span>
      ) : null}
    </>
  )
}

type BrandButtonProps = Omit<ButtonPrimitive.Props, 'className'> &
  BrandChromeProps

function BrandButton({
  className,
  brandVariant = 'primary',
  brandSize = 'md',
  presentation = 'interactive',
  leftSlot,
  rightSlot,
  leftSlotRing,
  children,
  type,
  ...props
}: BrandButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      type={type ?? 'button'}
      className={brandButtonClassName({
        brandVariant,
        brandSize,
        presentation,
        className,
      })}
      {...props}
    >
      <BrandButtonChrome
        brandVariant={brandVariant}
        brandSize={brandSize}
        leftSlot={leftSlot}
        rightSlot={rightSlot}
        leftSlotRing={leftSlotRing}
      >
        {children}
      </BrandButtonChrome>
    </ButtonPrimitive>
  )
}

type BrandLinkButtonProps = Omit<LinkProps, 'className'> & BrandChromeProps

/** Same visuals as {@link BrandButton}, rendered as a client-side router link. */
function BrandLinkButton({
  className,
  brandVariant = 'primary',
  brandSize = 'md',
  presentation = 'interactive',
  leftSlot,
  rightSlot,
  leftSlotRing,
  children,
  ...props
}: BrandLinkButtonProps) {
  return (
    <Link
      data-slot="link-button"
      className={cn(
        brandButtonClassName({
          brandVariant,
          brandSize,
          presentation,
          className,
        }),
        'no-underline',
      )}
      {...props}
    >
      <BrandButtonChrome
        brandVariant={brandVariant}
        brandSize={brandSize}
        leftSlot={leftSlot}
        rightSlot={rightSlot}
        leftSlotRing={leftSlotRing}
      >
        {children}
      </BrandButtonChrome>
    </Link>
  )
}

type BrandAnchorButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'className'
> &
  BrandChromeProps

/** Same visuals as {@link BrandButton}, for external / absolute URLs. */
function BrandAnchorButton({
  className,
  brandVariant = 'primary',
  brandSize = 'md',
  presentation = 'interactive',
  leftSlot,
  rightSlot,
  leftSlotRing,
  children,
  target = '_blank',
  rel,
  ...props
}: BrandAnchorButtonProps) {
  return (
    <a
      data-slot="anchor-button"
      target={target}
      rel={rel ?? (target === '_blank' ? 'noreferrer' : undefined)}
      className={cn(
        brandButtonClassName({
          brandVariant,
          brandSize,
          presentation,
          className,
        }),
        'no-underline',
      )}
      {...props}
    >
      <BrandButtonChrome
        brandVariant={brandVariant}
        brandSize={brandSize}
        leftSlot={leftSlot}
        rightSlot={rightSlot}
        leftSlotRing={leftSlotRing}
      >
        {children}
      </BrandButtonChrome>
    </a>
  )
}

const Button = BrandButton

export { BrandAnchorButton, BrandButton, BrandLinkButton, Button }
