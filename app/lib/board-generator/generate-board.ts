import { Board, BoardCell, BoardCellState } from '~/lib/board';
import {
  selectFilledImbalancedLine,
  selectLineThatIsEqualToOthers,
  selectThreeOrMoreIdenticalSequentialCells,
} from '~/lib/board-selectors';
import { MatrixSelection } from '~/lib/matrix';
import { expectToBeDefined } from '~/shared/expect';
import { type Random, shuffle } from '~/shared/random';
import { type Abortable, setTimeout } from '~/shared/timers';

import { generateBoardLines } from './generate-board-lines';

function isValidBoard(target: Board) {
  if (selectFilledImbalancedLine(target) !== undefined) {
    return false;
  }

  if (selectLineThatIsEqualToOthers(target) !== undefined) {
    return false;
  }

  if (selectThreeOrMoreIdenticalSequentialCells(target) !== undefined) {
    return false;
  }

  return true;
}

export async function generateBoard(size: number, progress: number, random: Random, options?: Abortable) {
  const lines = generateBoardLines(size);
  const combinations = shuffle(lines, random);

  let attempt = 0;
  let board = Board.blank(size);
  let index = 0;

  do {
    const line = expectToBeDefined(combinations.shift());
    const target = board.replace(index, () => line);

    attempt++;

    if (isValidBoard(target)) {
      board = target;
      index++;
      attempt = 0;
    } else {
      combinations.push(line);

      if (attempt >= combinations.length) {
        for (const line of board) {
          if (lines.includes(line)) {
            combinations.push(line);
          }
        }

        board = Board.blank(size);
        index = 0;
        attempt = 0;

        await setTimeout(undefined, undefined, options);
      }
    }
  } while (index < size);

  do {
    const selection = new MatrixSelection([
      {
        x: random.next(0, size - 1),
        y: random.next(0, size - 1),
      },
    ]);

    board = board.replaceBy(selection, () => BoardCell.create(BoardCellState.E));
  } while (board.progress > progress);

  return board;
}
