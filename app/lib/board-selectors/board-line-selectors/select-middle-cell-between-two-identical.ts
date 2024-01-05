import { type BoardCell, type BoardLine } from '~/lib/board';
import { expectToBeDefined } from '~/shared/expect';

export function selectMiddleCellBetweenTwoIdentical(target: BoardLine) {
  for (const [start, head] of target.entries()) {
    if (head.isFilled) {
      const tail: BoardCell[] = [];

      for (const [end, cell] of target.entries()) {
        if (start >= end) {
          continue;
        }

        tail.push(cell);
      }

      if (tail.length >= 2) {
        const middle = expectToBeDefined(tail[0]);
        const next = expectToBeDefined(tail[1]);

        if (head.equals(next) && middle.isEmpty) {
          return { cell: middle };
        }
      }
    }
  }
}
