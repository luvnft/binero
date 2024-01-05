import { type Board } from '~/lib/board';
import { type Random } from '~/shared/random';

import { BoardAnalyzerReviewKind, analyzeBoardByKind } from './analyze-board-by-kind';

export function analyzeBoard(target: Board, random: Random) {
  return (
    analyzeBoardByKind(BoardAnalyzerReviewKind.Correction, target, random) ??
    analyzeBoardByKind(BoardAnalyzerReviewKind.Suggestion, target, random)
  );
}
