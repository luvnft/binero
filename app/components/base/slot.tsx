import { type HTMLAttributes, cloneElement, isValidElement } from 'react';

import { assert } from '~/shared/assert';

export function Slot({ children, ...props }: HTMLAttributes<HTMLElement>) {
  assert(isValidElement<HTMLAttributes<HTMLElement>>(children));

  return cloneElement(children, props);
}
