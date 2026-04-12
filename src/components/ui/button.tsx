import { Button as ButtonPrimitive } from '@base-ui/react/button'
import type { VariantProps } from 'class-variance-authority'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

import {
  brandButtonVariants,
  iconRingVariants,
  labelVariants,
} from '@/components/ui/button-variants'
import { cn } from '@/lib/utils'

type BrandVariant = VariantProps<typeof brandButtonVariants>['brandVariant']
type BrandSize = VariantProps<typeof brandButtonVariants>['brandSize']

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

type BrandButtonProps = Omit<ButtonPrimitive.Props, 'className'> &
  VariantProps<typeof brandButtonVariants> & {
    className?: string
    leftSlot?: ReactNode | null
    rightSlot?: ReactNode | null
    presentation?: 'interactive' | 'hover'
  }

function brandButtonClassName({
  brandVariant,
  brandSize,
  presentation,
  className,
}: Pick<
  BrandButtonProps,
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

function BrandButton({
  className,
  brandVariant = 'primary',
  brandSize = 'md',
  presentation = 'interactive',
  leftSlot,
  rightSlot,
  children,
  type,
  ...props
}: BrandButtonProps) {
  const showLeft = leftSlot !== null
  const showRight = rightSlot !== null
  const left =
    leftSlot === undefined ? (
      <ArrowUpRight aria-hidden strokeWidth={1.5} />
    ) : (
      leftSlot
    )
  const right =
    rightSlot === undefined ? (
      <ArrowUpRight aria-hidden strokeWidth={1.5} />
    ) : (
      rightSlot
    )

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
      {showLeft ? (
        <span
          className={iconRingVariants({ brandVariant, brandSize })}
          data-part="icon-left"
        >
          {left}
        </span>
      ) : null}
      <BrandButtonLabel brandVariant={brandVariant} brandSize={brandSize}>
        {children}
      </BrandButtonLabel>
      {showRight ? (
        <span
          className={iconRingVariants({ brandVariant, brandSize })}
          data-part="icon-right"
        >
          {right}
        </span>
      ) : null}
    </ButtonPrimitive>
  )
}

type BrandLinkButtonProps = Omit<LinkProps, 'className'> &
  VariantProps<typeof brandButtonVariants> & {
    className?: string
    leftSlot?: ReactNode | null
    rightSlot?: ReactNode | null
    presentation?: 'interactive' | 'hover'
  }

/** Same visuals as {@link BrandButton}, rendered as a client-side router link. */
function BrandLinkButton({
  className,
  brandVariant = 'primary',
  brandSize = 'md',
  presentation = 'interactive',
  leftSlot,
  rightSlot,
  children,
  ...props
}: BrandLinkButtonProps) {
  const showLeft = leftSlot !== null
  const showRight = rightSlot !== null
  const left =
    leftSlot === undefined ? (
      <ArrowUpRight aria-hidden strokeWidth={1.5} />
    ) : (
      leftSlot
    )
  const right =
    rightSlot === undefined ? (
      <ArrowUpRight aria-hidden strokeWidth={1.5} />
    ) : (
      rightSlot
    )

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
      {showLeft ? (
        <span
          className={iconRingVariants({ brandVariant, brandSize })}
          data-part="icon-left"
        >
          {left}
        </span>
      ) : null}
      <BrandButtonLabel brandVariant={brandVariant} brandSize={brandSize}>
        {children}
      </BrandButtonLabel>
      {showRight ? (
        <span
          className={iconRingVariants({ brandVariant, brandSize })}
          data-part="icon-right"
        >
          {right}
        </span>
      ) : null}
    </Link>
  )
}

const Button = BrandButton

export { BrandButton, BrandLinkButton, Button }
