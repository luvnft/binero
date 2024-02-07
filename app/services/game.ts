import { Board, type BoardValue } from '~/lib/board';
import * as BoardAnalyzer from '~/lib/board-analyzer';
import * as BoardGenerator from '~/lib/board-generator';
import { MatrixSelection, type MatrixSelectionPosition } from '~/lib/matrix';
import { Random } from '~/shared/random';
import { type Abortable } from '~/shared/timers';

export interface Game {
  readonly board: Board;
}

export function isBoardSolved(board: Board) {
  if (board.progress < 1) {
    return false;
  }

  const boardAnalyzerReview = BoardAnalyzer.analyzeBoardByKind(
    BoardAnalyzer.BoardAnalyzerReviewKind.Correction,
    board,
    Random.stable(),
  );

  return boardAnalyzerReview === undefined;
}

export function analyzeBoard(board: Board, random: Random) {
  return BoardAnalyzer.analyzeBoard(board, random);
}

export function generateBoard(size: number, options?: Abortable) {
  return BoardGenerator.generateBoard(size, 0.6, Random.create(), options);
}

export function parseBoard(value: string) {
  return Board.parse(value);
}

export function getBoard(value: BoardValue) {
  return Board.from(value);
}

export function getNextBoard(board: Board, position: MatrixSelectionPosition) {
  return board.replaceBy(new MatrixSelection([position]), (cell) => cell.next());
}
