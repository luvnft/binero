import { type ReactNode } from 'react';

import { Button, type ButtonVariant } from '~/components/ui/button';

export type MenuItemVariant = ButtonVariant;

export function MenuItem({ children, variant }: { children: ReactNode; variant: MenuItemVariant }) {
  return (
    <li className='flex'>
      <Button asChild variant={variant}>
        {children}
      </Button>
    </li>
  );
}
