import { assert, expect, test } from 'vitest';

import { Board, BoardCellState } from '~/lib/board';
import { MatrixSelection } from '~/lib/matrix';

import { selectLineThatIsEqualToOthers } from './select-line-that-is-equal-to-others';

test.each([
  Board.create([
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
  ]),
])('selects line that is equal to others', (target) => {
  const payload = selectLineThatIsEqualToOthers(target);

  assert(payload !== undefined);

  const selection = MatrixSelection.from(target, [
    ...Array.from(payload.line),
    ...payload.others.flatMap((line) => Array.from(line)),
  ]);

  expect(payload.orientation).toMatchSnapshot();
  expect(target.replaceBy(selection, (cell) => cell.toFixed())).toMatchSnapshot();
});

test.each([
  Board.create([
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.E],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.E],
    [BoardCellState.R, BoardCellState.R, BoardCellState.B, BoardCellState.B],
  ]),
  Board.create([
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.R, BoardCellState.E, BoardCellState.R, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.B, BoardCellState.E],
    [BoardCellState.B, BoardCellState.E, BoardCellState.E, BoardCellState.E],
  ]),
  Board.create([
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.R, BoardCellState.E, BoardCellState.R],
    [BoardCellState.E, BoardCellState.B, BoardCellState.E, BoardCellState.B],
    [BoardCellState.E, BoardCellState.E, BoardCellState.E, BoardCellState.B],
  ]),
])('returns "undefined" if no line that is equal to others exist', (target) => {
  expect(selectLineThatIsEqualToOthers(target)).toMatchSnapshot();
});
