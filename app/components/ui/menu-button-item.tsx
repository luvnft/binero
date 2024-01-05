import { type ReactNode } from 'react';

import { MenuItem, type MenuItemVariant } from '~/components/ui/menu-item';

export function MenuButtonItem({
  children,
  noscript,
  variant,
}: {
  children: ReactNode;
  noscript?: boolean;
  variant: MenuItemVariant;
}) {
  return (
    <MenuItem noscript={noscript} variant={variant}>
      <button>{children}</button>
    </MenuItem>
  );
}
