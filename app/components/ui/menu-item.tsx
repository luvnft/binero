import { type ReactNode } from 'react';

import { Button, type ButtonVariant } from '~/components/ui/button';

export type MenuItemVariant = ButtonVariant;

export function MenuItem({
  children,
  loading,
  variant,
}: {
  children: ReactNode;
  loading?: boolean;
  variant: MenuItemVariant;
}) {
  return (
    <li className='flex'>
      <Button asChild loading={loading} variant={variant}>
        {children}
      </Button>
    </li>
  );
}
