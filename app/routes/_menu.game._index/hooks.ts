import { type PathPattern, matchPath } from '@remix-run/router';
import { useMemo } from 'react';

export function useMatchParams<T extends string>(pattern: PathPattern<T> | T, pathname?: string) {
  const matchParams = useMemo(() => {
    if (pathname === undefined) {
      return null;
    }

    const match = matchPath(pattern, pathname);

    if (match === null) {
      return null;
    }

    return match.params;
  }, [pattern, pathname]);

  return matchParams;
}
