import { expect, test } from 'vitest';

import { generateBoardLines } from './generate-board-lines';

test.each([4, 6, 8, 10, 12])('generate board lines', (size) => {
  expect(generateBoardLines(size)).toMatchSnapshot();
});
