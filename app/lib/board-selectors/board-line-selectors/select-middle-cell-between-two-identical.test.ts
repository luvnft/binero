import { expect, test } from 'vitest';

import { BoardCellState, BoardLine } from '~/lib/board';

import { selectMiddleCellBetweenTwoIdentical } from './select-middle-cell-between-two-identical';

test.each([
  BoardLine.create([BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R]),
  BoardLine.create([BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E]),
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R]),
])('selects middle cell between two identical', (target) => {
  expect(selectMiddleCellBetweenTwoIdentical(target)).toMatchSnapshot();
});
