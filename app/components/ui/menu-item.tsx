import { type ReactNode } from 'react';

import { Button, type ButtonVariant } from '~/components/ui/button';

export type MenuItemVariant = ButtonVariant;

export function MenuItem({
  children,
  noscript,
  variant,
}: {
  children: ReactNode;
  noscript?: boolean;
  variant: MenuItemVariant;
}) {
  return (
    <li className='flex'>
      <Button asChild noscript={noscript} variant={variant}>
        {children}
      </Button>
    </li>
  );
}
