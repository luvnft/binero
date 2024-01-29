import {
  type ComponentProps,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  cloneElement,
  isValidElement,
} from 'react';

import { SlotOutletContext } from '~/components/base/slot-outlet';
import { SlotRoot } from '~/components/base/slot-root';
import { expectToSatisfy } from '~/shared/expect';

function isSlotRoot(node: ReactNode): node is ReactElement<ComponentProps<typeof SlotRoot>> {
  return isValidElement(node) && node.type === SlotRoot;
}

function unwrap(node: ReactNode) {
  if (isSlotRoot(node)) {
    const target = expectToSatisfy(node.props.target, isValidElement<HTMLAttributes<HTMLElement>>);

    return cloneElement(
      target,
      undefined,
      <SlotOutletContext.Provider value={target.props.children}>{node.props.children}</SlotOutletContext.Provider>,
    );
  }

  return node;
}

function assignClassName(target: HTMLAttributes<HTMLElement>, source: HTMLAttributes<HTMLElement>) {
  if (target.className !== undefined && source.className !== undefined) {
    target.className += ` ${source.className}`;
  }
}

export function Slot({ children, ...props }: HTMLAttributes<HTMLElement>) {
  const element = expectToSatisfy(unwrap(children), isValidElement<HTMLAttributes<HTMLElement>>);

  assignClassName(props, element.props);

  return cloneElement(element, props);
}
