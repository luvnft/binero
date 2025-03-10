import { type Board, BoardCellState } from '~/lib/board';

export function selectLineThatCanBeEqualToAnother(target: Board) {
  for (const board of target.toDoubleRotation()) {
    for (const [start, head] of board.entries()) {
      if (!head.isEmpty && head.lengthOf(BoardCellState.E) === 2 && head.balance === 0) {
        for (const [end, line] of board.entries()) {
          if (start >= end) {
            continue;
          }

          if (head.equals(line)) {
            return { another: line, line: head, orientation: board.orientation };
          }
        }
      }
    }
  }
}
