import { assert, expect, test } from 'vitest';

import { Board, BoardCellState } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectUnfilledBalancedLine } from './select-unfilled-balanced-line';

test.each([
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.R],
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
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
  ]),
])('selects unfilled balanced line', (target) => {
  const payload = selectUnfilledBalancedLine(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.from(target, Array.from(payload.line));

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.R, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.R],
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
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.R, BoardCellState.B, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
  ]),
])('returns "undefined" if no unfilled balanced line exist', (target) => {
  expect(selectUnfilledBalancedLine(target)).toMatchSnapshot();
});
