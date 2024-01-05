import { type CSSProperties, type ReactNode } from 'react';

export function GameBoard({ children, size }: { children: ReactNode; size: number }) {
  return (
    <div
      className='my-auto grid aspect-square w-full grid-cols-[repeat(var(--size),1fr)] grid-rows-[repeat(var(--size),1fr)] gap-[calc(10%/var(--size))]'
      style={{ '--size': size } as CSSProperties}
    >
      {children}
    </div>
  );
}
