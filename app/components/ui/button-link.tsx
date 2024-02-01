import { Link, useNavigation, useResolvedPath } from '@remix-run/react';
import { type ReactNode } from 'react';

import { HistoryLink, type HistoryLinkPrefetch } from '~/components/base/history-link';
import { Button, type ButtonVariant } from '~/components/ui/button';

export type ButtonLinkVariant = ButtonVariant;

export type ButtonLinkPrefetch = HistoryLinkPrefetch;

export function ButtonLink({
  children,
  history = true,
  prefetch,
  replace,
  to,
  variant,
}: {
  children: ReactNode;
  history?: boolean;
  prefetch?: ButtonLinkPrefetch;
  replace?: boolean;
  to: string;
  variant: ButtonLinkVariant;
}) {
  const navigation = useNavigation();
  const path = useResolvedPath(to);
  const Component = history ? HistoryLink : Link;

  return (
    <Button
      asChild
      loading={navigation.state === 'loading' && navigation.location.pathname === path.pathname}
      variant={variant}
    >
      <Component prefetch={prefetch} replace={replace} to={path}>
        {children}
      </Component>
    </Button>
  );
}
