import { useLocation, useResolvedPath } from '@remix-run/react';
import { ChevronLeft, Settings2 } from 'lucide-react';

import { ButtonLink } from '~/components/ui/button-link';
import { useReferrerPath } from '~/hooks/use-referrer-path';

export function LayoutHeader() {
  const location = useLocation();
  const referrerPath = useReferrerPath();
  const parentPath = useResolvedPath('..', { relative: 'path' });

  return (
    <header className='flex h-14 justify-between'>
      <div className='flex items-center'>
        {location.pathname !== parentPath.pathname && (
          <ButtonLink history={false} replace size='icon' to={referrerPath ?? parentPath} variant='ghost'>
            <ChevronLeft />
          </ButtonLink>
        )}
      </div>
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
