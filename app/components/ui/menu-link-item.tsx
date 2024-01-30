import { type ReactNode } from 'react';

import { HistoryLink } from '~/components/base/history-link';
import { Button, type ButtonVariant } from '~/components/ui/button';
import { MenuItem } from '~/components/ui/menu-item';

export type MenuLinkItemVariant = ButtonVariant;

export function MenuLinkItem({
  children,
  loading,
  to,
  variant,
}: {
  children: ReactNode;
  loading?: boolean;
  to: string;
  variant: MenuLinkItemVariant;
}) {
  return (
    <MenuItem>
      <Button asChild loading={loading} variant={variant}>
        <HistoryLink prefetch='render' to={to}>
          {children}
        </HistoryLink>
      </Button>
    </MenuItem>
  );
}
