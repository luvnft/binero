import { expect, test } from 'vitest';

import { BoardCell, BoardCellKind, type BoardCellPair, BoardCellState } from './board-cell';

test.each([BoardCellState.B, BoardCellState.E, BoardCellState.R])('returns board cell from state', (state) => {
  expect(BoardCell.create(state)).toMatchSnapshot();
});

test.each([
  [[BoardCellKind.Regular, BoardCellState.B] as BoardCellPair],
  [[BoardCellKind.Regular, BoardCellState.E] as BoardCellPair],
  [[BoardCellKind.Regular, BoardCellState.R] as BoardCellPair],
])('returns board cell from value of', (value) => {
  expect(BoardCell.from(value)).toMatchSnapshot();
});

test.each([
  [BoardCell.create(BoardCellState.B), BoardCell.create(BoardCellState.B)],
  [BoardCell.create(BoardCellState.E), BoardCell.create(BoardCellState.E)],
  [BoardCell.create(BoardCellState.R), BoardCell.create(BoardCellState.R)],
])('returns "true" if one board cell is equal to other', (cell, other) => {
  expect(cell.equals(other)).toMatchSnapshot();
});

test.each([
  [BoardCell.create(BoardCellState.B), BoardCell.create(BoardCellState.E)],
  [BoardCell.create(BoardCellState.B), BoardCell.create(BoardCellState.R)],
  [BoardCell.create(BoardCellState.E), BoardCell.create(BoardCellState.R)],
  [BoardCell.create(BoardCellState.E), BoardCell.create(BoardCellState.B)],
  [BoardCell.create(BoardCellState.R), BoardCell.create(BoardCellState.E)],
  [BoardCell.create(BoardCellState.R), BoardCell.create(BoardCellState.B)],
])('returns "false" if one board cell is not equal to other', (cell, other) => {
  expect(cell.equals(other)).toMatchSnapshot();
});

test.each([
  BoardCell.create(BoardCellState.B),
  BoardCell.create(BoardCellState.E),
  BoardCell.create(BoardCellState.R),
  new BoardCell(BoardCellKind.Fixed, BoardCellState.E),
  new BoardCell(BoardCellKind.Fixed, BoardCellState.R),
  new BoardCell(BoardCellKind.Fixed, BoardCellState.B),
])('returns next board cell', (cell) => {
  expect(cell.next()).toMatchSnapshot();
});

test.each([BoardCell.create(BoardCellState.B), BoardCell.create(BoardCellState.E), BoardCell.create(BoardCellState.R)])(
  'returns fixed board cell',
  (cell) => {
    expect(cell.toFixed()).toMatchSnapshot();
  },
);

test.each([BoardCell.create(BoardCellState.B), BoardCell.create(BoardCellState.E), BoardCell.create(BoardCellState.R)])(
  'returns board cell value of',
  (cell) => {
    expect(cell.valueOf()).toMatchSnapshot();
  },
);

test.each([BoardCell.create(BoardCellState.B), BoardCell.create(BoardCellState.E), BoardCell.create(BoardCellState.R)])(
  'returns board cell balance',
  (cell) => {
    expect(cell.balance).toMatchSnapshot();
  },
);

test('returns "true" if board cell is empty', () => {
  expect(BoardCell.create(BoardCellState.E).isEmpty).toMatchSnapshot();
});

test.each([BoardCell.create(BoardCellState.R), BoardCell.create(BoardCellState.B)])(
  'returns "false" if board cell is not empty',
  (cell) => {
    expect(cell.isEmpty).toMatchSnapshot();
  },
);

test.each([BoardCell.create(BoardCellState.R), BoardCell.create(BoardCellState.B)])(
  'returns "true" if board cell is filled',
  (cell) => {
    expect(cell.isFilled).toMatchSnapshot();
  },
);

test('returns "false" if board cell is not filled', () => {
  expect(BoardCell.create(BoardCellState.E).isFilled).toMatchSnapshot();
});

test.each([
  new BoardCell(BoardCellKind.Fixed, BoardCellState.E),
  new BoardCell(BoardCellKind.Fixed, BoardCellState.R),
  new BoardCell(BoardCellKind.Fixed, BoardCellState.B),
])('returns "true" if board cell is fixed', (cell) => {
  expect(cell.isFixed).toMatchSnapshot();
});

test.each([BoardCell.create(BoardCellState.E), BoardCell.create(BoardCellState.R), BoardCell.create(BoardCellState.B)])(
  'returns "false" if board cell is not fixed',
  (cell) => {
    expect(cell.isFixed).toMatchSnapshot();
  },
);

test.each([BoardCell.create(BoardCellState.B), BoardCell.create(BoardCellState.E), BoardCell.create(BoardCellState.R)])(
  'returns board cell state',
  (cell) => {
    expect(cell.state).toMatchSnapshot();
  },
);
