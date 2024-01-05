import { parsePath, useLocation } from '@remix-run/react';
import { useMemo } from 'react';

export function useReferrerPath() {
  const location = useLocation();
  const referrerPath = useMemo(() => {
    const referrer = new URLSearchParams(location.search).get('referrer');

    if (referrer === null) {
      return null;
    }

    return parsePath(referrer);
  }, [location.search]);

  return referrerPath;
}
