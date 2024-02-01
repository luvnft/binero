import { useLocation, useResolvedPath } from '@remix-run/react';
import { ChevronLeft, Settings2 } from 'lucide-react';
import { type ReactNode } from 'react';

import { ButtonLink } from '~/components/ui/button-link';
import { useReferrerPath } from '~/hooks/use-referrer-path';

export function LayoutHeader({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const referrerPath = useReferrerPath();
  const parentPath = useResolvedPath('..', { relative: 'path' });

  return (
    <header className='grid h-14 grid-cols-3'>
      <div className='flex items-center'>
        {location.pathname !== parentPath.pathname && (
          <ButtonLink history={false} replace size='icon' to={referrerPath ?? parentPath} variant='ghost'>
            <ChevronLeft />
          </ButtonLink>
        )}
      </div>
      <div className='m-auto'>{children}</div>
      <div className='flex items-center justify-end'>
        {location.pathname !== '/settings' && (
          <ButtonLink size='icon' to='/settings' variant='ghost'>
            <Settings2 />
          </ButtonLink>
        )}
      </div>
    </header>
  );
}
