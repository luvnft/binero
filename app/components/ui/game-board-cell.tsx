import { type ReactNode, useContext } from 'react';

import { AriaLabelledByContext } from '~/components/base/aria-labelled';
import { Slot } from '~/components/base/slot';
import { BoardCellState } from '~/lib/board';

const GAME_BOARD_CELL_DATA_STATE_BY_BOARD_CELL_STATE: Readonly<Record<BoardCellState, string>> = {
  [BoardCellState.B]: 'b',
  [BoardCellState.E]: 'e',
  [BoardCellState.R]: 'r',
};

export function GameBoardCell({
  asChild,
  children,
  highlighted,
  locked,
  state,
}: {
  asChild?: boolean;
  children?: ReactNode;
  highlighted?: boolean;
  locked?: boolean;
  state: BoardCellState;
}) {
  const Component = asChild ? Slot : 'span';
  const ariaLabelledBy = useContext(AriaLabelledByContext);

  return (
    <Component
      aria-labelledby={ariaLabelledBy}
      className='relative flex aspect-square items-center justify-center outline-none before:absolute before:inset-0 before:z-[-2] before:transition-colors before:rounded-smooth-50 after:absolute after:inset-0 after:z-[-1] after:transition-all after:rounded-smooth-50 focus-visible:after:scale-75 data-[highlighted=true]:before:animate-pulse data-[highlighted=true]:data-[state=b]:before:bg-cell-b-highlight data-[highlighted=true]:data-[state=e]:before:bg-cell-e-highlight data-[highlighted=true]:data-[state=r]:before:bg-cell-r-highlight data-[highlighted=true]:after:scale-75 data-[state=b]:after:bg-cell-b data-[state=e]:after:bg-cell-e data-[state=r]:after:bg-cell-r focus-visible:data-[state=b]:before:bg-cell-b-focus focus-visible:data-[state=e]:before:bg-cell-e-focus focus-visible:data-[state=r]:before:bg-cell-r-focus active:data-[locked=true]:after:animate-wiggle'
      data-highlighted={highlighted}
      data-locked={locked}
      data-state={GAME_BOARD_CELL_DATA_STATE_BY_BOARD_CELL_STATE[state]}
    >
      {children}
    </Component>
  );
}
