import { assert, expect, test } from 'vitest';

import { Board, BoardCellState } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectLineThatIncludesAnother } from './select-line-that-includes-another';

test.each([
  Board.create([
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B, BoardCellState.R, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B],
  ]),
])('selects line that includes another', (target) => {
  const payload = selectLineThatIncludesAnother(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.from(target, [...Array.from(payload.line), ...Array.from(payload.another)]);

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.B, BoardCellState.E, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.B, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.E],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.B, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
  ]),
])('returns "undefined" if no line that includes another exist', (target) => {
  expect(selectLineThatIncludesAnother(target)).toMatchSnapshot();
});
