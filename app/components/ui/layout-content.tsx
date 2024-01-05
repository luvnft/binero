import { type ReactNode } from 'react';

export function LayoutContent({ children }: { children: ReactNode }) {
  return <main className='pb-14 pt-4'>{children}</main>;
}
