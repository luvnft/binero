import { assert, expect, test } from 'vitest';

import { Board, BoardCellState } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectThreeOrMoreIdenticalSequentialCells } from './select-three-or-more-identical-sequential-cells';

test.each([
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.R, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.R, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
  ]),
])('selects three or more identical sequential cells', (target) => {
  const payload = selectThreeOrMoreIdenticalSequentialCells(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.from(target, payload.cells);

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
  ]),
])('returns "undefined" if no three or more identical sequential cells exist', (target) => {
  expect(selectThreeOrMoreIdenticalSequentialCells(target)).toMatchSnapshot();
});
