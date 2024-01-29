import { type ReactNode } from 'react';

import { HistoryLink } from '~/components/base/history-link';
import { MenuItem, type MenuItemVariant } from '~/components/ui/menu-item';

export function MenuLinkItem({
  children,
  loading,
  to,
  variant,
}: {
  children: ReactNode;
  loading?: boolean;
  to: string;
  variant: MenuItemVariant;
}) {
  return (
    <MenuItem loading={loading} variant={variant}>
      <HistoryLink prefetch='render' to={to}>
        {children}
      </HistoryLink>
    </MenuItem>
  );
}
