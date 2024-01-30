import { useNavigation, useResolvedPath } from '@remix-run/react';
import { type ReactNode } from 'react';

import { HistoryLink } from '~/components/base/history-link';
import { Button, type ButtonVariant } from '~/components/ui/button';
import { MenuItem } from '~/components/ui/menu-item';

export type MenuLinkItemVariant = ButtonVariant;

export function MenuLinkItem({
  children,
  to,
  variant,
}: {
  children: ReactNode;
  to: string;
  variant: MenuLinkItemVariant;
}) {
  const navigation = useNavigation();
  const path = useResolvedPath(to);

  return (
    <MenuItem>
      <Button
        asChild
        loading={navigation.state === 'loading' && navigation.location.pathname === path.pathname}
        variant={variant}
      >
        <HistoryLink prefetch='render' to={path}>
          {children}
        </HistoryLink>
      </Button>
    </MenuItem>
  );
}
