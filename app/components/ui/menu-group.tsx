import { type ReactNode } from 'react';

export function MenuGroup({ children }: { children: ReactNode }) {
  return <ul className='flex flex-col gap-y-3'>{children}</ul>;
}
