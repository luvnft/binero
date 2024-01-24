import { type ReactNode } from 'react';

import { MenuItem, type MenuItemVariant } from '~/components/ui/menu-item';

export function MenuButtonItem({ children, variant }: { children: ReactNode; variant: MenuItemVariant }) {
  return (
    <MenuItem variant={variant}>
      <button>{children}</button>
    </MenuItem>
  );
}
