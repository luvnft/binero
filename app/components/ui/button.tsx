import { type ReactNode } from 'react';

import { Slot } from '~/components/base/slot';

export type ButtonVariant = 'primary' | 'secondary';

export function Button({
  asChild,
  children,
  noscript,
  variant,
}: {
  asChild?: boolean;
  children: ReactNode;
  noscript?: boolean;
  variant: ButtonVariant;
}) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className='flex-grow rounded-lg py-3 text-center data-[variant=primary]:bg-primary data-[variant=secondary]:bg-secondary data-[variant=primary]:text-primary-content data-[variant=secondary]:text-secondary-content data-[noscript=true]:scripting-enabled:hidden data-[noscript=true]:scripting-none:block'
      data-noscript={noscript}
      data-variant={variant}
    >
      {children}
    </Component>
  );
}
