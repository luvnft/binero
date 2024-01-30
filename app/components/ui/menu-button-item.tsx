import { type ReactNode } from 'react';

import { Button, type ButtonVariant } from '~/components/ui/button';
import { MenuItem } from '~/components/ui/menu-item';

export type MenuButtonItemVariant = ButtonVariant;

export function MenuButtonItem({ children, variant }: { children: ReactNode; variant: MenuButtonItemVariant }) {
  return (
    <MenuItem>
      <Button variant={variant}>{children}</Button>
    </MenuItem>
  );
}
