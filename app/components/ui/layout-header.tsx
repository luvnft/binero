import { Link, useLocation, useResolvedPath } from '@remix-run/react';
import { ChevronLeft, Settings2 } from 'lucide-react';
import { type ReactNode } from 'react';

import { HistoryLink } from '~/components/base/history-link';
import { useReferrerPath } from '~/hooks/use-referrer-path';

export function LayoutHeader({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const referrerPath = useReferrerPath();
  const parentPath = useResolvedPath('..', { relative: 'path' });

  return (
    <header className='grid h-14 grid-cols-3'>
      <div className='flex items-center'>
        {location.pathname !== parentPath.pathname && (
          <Link replace to={referrerPath ?? parentPath}>
            <ChevronLeft className='size-5' />
          </Link>
        )}
      </div>
      <div className='m-auto'>{children}</div>
      <div className='flex items-center justify-end'>
        {location.pathname !== '/settings' && (
          <HistoryLink to='/settings'>
            <Settings2 className='size-5' />
          </HistoryLink>
        )}
      </div>
    </header>
  );
}
