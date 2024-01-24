import { type ReactNode } from 'react';

import { HistoryLink } from '~/components/base/history-link';
import { MenuItem, type MenuItemVariant } from '~/components/ui/menu-item';

export function MenuLinkItem({ children, to, variant }: { children: ReactNode; to: string; variant: MenuItemVariant }) {
  return (
    <MenuItem variant={variant}>
      <HistoryLink prefetch='render' to={to}>
        {children}
      </HistoryLink>
    </MenuItem>
  );
}
