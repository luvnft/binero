import { expect, test } from 'vitest';

import { MatrixSelection } from './matrix-selection';

test.each([
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    [1, 1, 4, 5, 7, 9],
  ],
  [
    [
      [1, 2],
      [4, 5],
    ],
    [1, 1, 4, 5],
  ],
])('returns matrix selection', (matrix, cells) => {
  expect(MatrixSelection.from(matrix, cells).execute(matrix)).toMatchSnapshot();
});

test.each([
  [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ]),
  ],
  [
    [
      [1, 2],
      [4, 5],
    ],
    new MatrixSelection([
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ]),
  ],
])('returns matrix cells', (matrix, selection) => {
  expect(selection.execute(matrix)).toMatchSnapshot();
});
