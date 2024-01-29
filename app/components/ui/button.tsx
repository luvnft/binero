import { Loader2 } from 'lucide-react';
import { type ReactNode } from 'react';

import { Slot } from '~/components/base/slot';
import { SlotOutlet } from '~/components/base/slot-outlet';
import { SlotRoot } from '~/components/base/slot-root';

export type ButtonVariant = 'primary' | 'secondary';

export function Button({
  asChild,
  children,
  loading,
  variant,
}: {
  asChild?: boolean;
  children: ReactNode;
  loading?: boolean;
  variant: ButtonVariant;
}) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className='flex flex-grow justify-center rounded-lg py-3 transition-colors data-[variant=primary]:bg-primary data-[variant=secondary]:bg-secondary data-[variant=primary]:text-primary-content data-[variant=secondary]:text-secondary-content hover:data-[variant=primary]:bg-primary/90 hover:data-[variant=secondary]:bg-secondary/90'
      data-variant={variant}
    >
      <SlotRoot target={children}>{loading ? <Loader2 className='animate-spin' /> : <SlotOutlet />}</SlotRoot>
    </Component>
  );
}
