import { type HTMLAttributes, cloneElement, isValidElement } from 'react';

import { assert } from '~/shared/assert';

function assignClassName(target: HTMLAttributes<HTMLElement>, source: HTMLAttributes<HTMLElement>) {
  if (target.className !== undefined && source.className !== undefined) {
    target.className += ` ${source.className}`;
  }
}

export function Slot({ children, ...props }: HTMLAttributes<HTMLElement>) {
  assert(isValidElement<HTMLAttributes<HTMLElement>>(children));
  assignClassName(props, children.props);

  return cloneElement(children, props);
}
