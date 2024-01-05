import { expect, test } from 'vitest';

import { BoardCellState, BoardLine } from '~/lib/board';

import { selectThreeOrMoreIdenticalSequentialCells } from './select-three-or-more-identical-sequential-cells';

test.each([
  BoardLine.create([BoardCellState.R, BoardCellState.R, BoardCellState.R, BoardCellState.E]),
  BoardLine.create([BoardCellState.E, BoardCellState.R, BoardCellState.R, BoardCellState.R]),
  BoardLine.create([BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.E]),
  BoardLine.create([BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.R]),
])('selects three or more identical sequential cells', (target) => {
  expect(selectThreeOrMoreIdenticalSequentialCells(target)).toMatchSnapshot();
});
