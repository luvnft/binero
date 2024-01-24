import { type ReactNode } from 'react';

import { Slot } from '~/components/base/slot';

export type ButtonVariant = 'primary' | 'secondary';

export function Button({
  asChild,
  children,
  variant,
}: {
  asChild?: boolean;
  children: ReactNode;
  variant: ButtonVariant;
}) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className='flex-grow rounded-lg py-3 text-center transition-colors data-[variant=primary]:bg-primary data-[variant=secondary]:bg-secondary data-[variant=primary]:text-primary-content data-[variant=secondary]:text-secondary-content hover:data-[variant=primary]:bg-primary/90 hover:data-[variant=secondary]:bg-secondary/90'
      data-variant={variant}
    >
      {children}
    </Component>
  );
}
