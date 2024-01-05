import { type ReactNode } from 'react';

import { HistoryLink } from '~/components/base/history-link';
import { MenuItem, type MenuItemVariant } from '~/components/ui/menu-item';

export function MenuLinkItem({
  children,
  noscript,
  to,
  variant,
}: {
  children: ReactNode;
  noscript?: boolean;
  to: string;
  variant: MenuItemVariant;
}) {
  return (
    <MenuItem noscript={noscript} variant={variant}>
      <HistoryLink prefetch='render' to={to}>
        {children}
      </HistoryLink>
    </MenuItem>
  );
}
