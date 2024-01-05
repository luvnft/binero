import { type Board, type BoardOrientation } from '~/lib/board';
import {
  selectFilledImbalancedLine,
  selectLineThatCanBeEqualToAnother,
  selectLineThatIncludesAnother,
  selectLineThatIsEqualToOthers,
  selectMiddleCellBetweenTwoIdentical,
  selectNextCellAfterTwoIdentical,
  selectThreeOrMoreIdenticalSequentialCells,
  selectUnfilledBalancedLine,
} from '~/lib/board-selectors';
import { MatrixSelection, type MatrixSelectionCoords } from '~/lib/matrix';
import { type Random, shuffle } from '~/shared/random';

export enum BoardAnalyzerReviewKind {
  Correction = 0,
  Suggestion = 1,
}

export enum BoardAnalyzerReviewReason {
  LineCanBeEqualToAnother = 0,
  LineIncludesAnother = 1,
  LineIsEqualToOthers = 2,
  LineIsFilledAndImbalanced = 3,
  LineIsUnfilledAndBalanced = 4,
  MiddleCellBetweenTwoIdentical = 5,
  NextCellAfterTwoIdentical = 6,
  ThreeOrMoreIdenticalSequentialCells = 7,
}

export interface BoardAnalyzerReviewPayload {
  readonly data: readonly MatrixSelectionCoords[];
  readonly orientation: BoardOrientation;
}

export interface BoardAnalyzerReview {
  readonly payload: BoardAnalyzerReviewPayload;
  readonly reason: BoardAnalyzerReviewReason;
}

const BOARD_ANALYZER_REVIEW_REASONS_BY_BOARD_ANALYZER_REVIEW_KIND: Readonly<
  Record<BoardAnalyzerReviewKind, readonly BoardAnalyzerReviewReason[]>
> = {
  [BoardAnalyzerReviewKind.Correction]: [
    BoardAnalyzerReviewReason.LineIsFilledAndImbalanced,
    BoardAnalyzerReviewReason.LineIsEqualToOthers,
    BoardAnalyzerReviewReason.ThreeOrMoreIdenticalSequentialCells,
  ],
  [BoardAnalyzerReviewKind.Suggestion]: [
    BoardAnalyzerReviewReason.LineIsUnfilledAndBalanced,
    BoardAnalyzerReviewReason.LineCanBeEqualToAnother,
    BoardAnalyzerReviewReason.LineIncludesAnother,
    BoardAnalyzerReviewReason.MiddleCellBetweenTwoIdentical,
    BoardAnalyzerReviewReason.NextCellAfterTwoIdentical,
  ],
};

const SELECT_BY_BOARD_ANALYZER_REVIEW_REASON: Readonly<
  Record<BoardAnalyzerReviewReason, (target: Board) => BoardAnalyzerReviewPayload | undefined>
> = {
  [BoardAnalyzerReviewReason.LineCanBeEqualToAnother](target) {
    const payload = selectLineThatCanBeEqualToAnother(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...Array.from(payload.another)];

    return {
      data: MatrixSelection.from(target, cells).valueOf(),
      orientation: payload.orientation,
    };
  },

  [BoardAnalyzerReviewReason.LineIncludesAnother](target) {
    const payload = selectLineThatIncludesAnother(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...Array.from(payload.another)];

    return {
      data: MatrixSelection.from(target, cells).valueOf(),
      orientation: payload.orientation,
    };
  },

  [BoardAnalyzerReviewReason.LineIsEqualToOthers](target) {
    const payload = selectLineThatIsEqualToOthers(target);

    if (payload === undefined) {
      return;
    }

    const cells = [...Array.from(payload.line), ...payload.others.flatMap((line) => Array.from(line))];

    return {
      data: MatrixSelection.from(target, cells).valueOf(),
      orientation: payload.orientation,
    };
  },

  [BoardAnalyzerReviewReason.LineIsFilledAndImbalanced](target) {
    const payload = selectFilledImbalancedLine(target);

    if (payload === undefined) {
      return;
    }

    const cells = Array.from(payload.line);

    return {
      data: MatrixSelection.from(target, cells).valueOf(),
      orientation: payload.orientation,
    };
  },

  [BoardAnalyzerReviewReason.LineIsUnfilledAndBalanced](target) {
    const payload = selectUnfilledBalancedLine(target);

    if (payload === undefined) {
      return;
    }

    const cells = Array.from(payload.line);

    return {
      data: MatrixSelection.from(target, cells).valueOf(),
      orientation: payload.orientation,
    };
  },

  [BoardAnalyzerReviewReason.MiddleCellBetweenTwoIdentical](target) {
    const payload = selectMiddleCellBetweenTwoIdentical(target);

    if (payload === undefined) {
      return;
    }

    const cells = [payload.cell];

    return {
      data: MatrixSelection.from(target, cells).valueOf(),
      orientation: payload.orientation,
    };
  },

  [BoardAnalyzerReviewReason.NextCellAfterTwoIdentical](target) {
    const payload = selectNextCellAfterTwoIdentical(target);

    if (payload === undefined) {
      return;
    }

    const cells = [payload.cell];

    return {
      data: MatrixSelection.from(target, cells).valueOf(),
      orientation: payload.orientation,
    };
  },

  [BoardAnalyzerReviewReason.ThreeOrMoreIdenticalSequentialCells](target) {
    const payload = selectThreeOrMoreIdenticalSequentialCells(target);

    if (payload === undefined) {
      return;
    }

    const cells = payload.cells;

    return {
      data: MatrixSelection.from(target, cells).valueOf(),
      orientation: payload.orientation,
    };
  },
};

export function analyzeBoardByKind(
  kind: BoardAnalyzerReviewKind,
  target: Board,
  random: Random,
): BoardAnalyzerReview | undefined {
  const reasons = shuffle(BOARD_ANALYZER_REVIEW_REASONS_BY_BOARD_ANALYZER_REVIEW_KIND[kind], random);

  for (const reason of reasons) {
    const select = SELECT_BY_BOARD_ANALYZER_REVIEW_REASON[reason];
    const payload = select(target);

    if (payload === undefined) {
      continue;
    }

    return { payload, reason };
  }
}
