import { type Board, type BoardLine } from '~/lib/board';

export function selectLineThatIsEqualToOthers(target: Board) {
  for (const board of target.toDoubleRotation()) {
    for (const [start, head] of board.entries()) {
      if (head.isFilled) {
        const others: BoardLine[] = [];

        for (const [end, line] of board.entries()) {
          if (start >= end) {
            continue;
          }

          if (head.equals(line)) {
            others.push(line);
          }
        }

        if (others.length > 0) {
          return { line: head, orientation: board.orientation, others };
        }
      }
    }
  }
}
