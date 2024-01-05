import { expect, test } from 'vitest';

import { BoardCellState, BoardLine } from '~/lib/board';

import { selectNextCellAfterTwoIdentical } from './select-next-cell-after-two-identical';

test.each([
  BoardLine.create([BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.E]),
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.R]),
  BoardLine.create([BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E]),
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R]),
])('selects next cell after two identical', (target) => {
  expect(selectNextCellAfterTwoIdentical(target)).toMatchSnapshot();
});
