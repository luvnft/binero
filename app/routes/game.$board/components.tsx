import { HelpCircle } from 'lucide-react';
import { type ReactNode } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { AriaLabel } from '~/components/base/aria-label';
import { AriaLabelled } from '~/components/base/aria-labelled';
import { HistoryLink } from '~/components/base/history-link';
import { ButtonLink } from '~/components/ui/button-link';
import { GameBoardAnalyzerReview } from '~/components/ui/game-board-analyzer-review';
import { GameBoardCell } from '~/components/ui/game-board-cell';
import { GameBoardCellLock } from '~/components/ui/game-board-cell-lock';
import { GameModalFooter } from '~/components/ui/game-modal-footer';
import { GameModalHeader } from '~/components/ui/game-modal-header';
import { type Board } from '~/lib/board';
import { type BoardAnalyzerReview } from '~/lib/board-analyzer';
import { type MatrixSelectionPosition } from '~/lib/matrix';
import { getNextBoard } from '~/services/game';
import { Random, sample } from '~/shared/random';

import { MESSAGE_ID_BY_BOARD_CELL_STATE, PRAISE_MESSAGE_IDS } from './constants';

export function GameTipContent({
  boardAnalyzerReview,
  progress,
}: {
  boardAnalyzerReview?: BoardAnalyzerReview;
  progress: number;
}) {
  if (boardAnalyzerReview === undefined) {
    return <FormattedNumber style='percent' value={progress} />;
  }

  return <GameBoardAnalyzerReview payload={boardAnalyzerReview.payload} reason={boardAnalyzerReview.reason} />;
}

export function GameBoardContent({
  board,
  boardAnalyzerReviewPayloadPositions,
  uncloak,
}: {
  board: Board;
  boardAnalyzerReviewPayloadPositions: readonly MatrixSelectionPosition[];
  uncloak: boolean;
}) {
  const children: ReactNode[] = [];

  for (const [y, line] of board.entries()) {
    for (const [x, cell] of line.entries()) {
      const key = `${x}-${y}`;
      const highlighted = boardAnalyzerReviewPayloadPositions.some((position) => position.x === x && position.y === y);
      const locked = cell.isFixed;

      children.push(
        <AriaLabelled key={key}>
          <GameBoardCell asChild highlighted={highlighted} locked={locked} state={cell.state}>
            {locked ? (
              <HistoryLink preventScrollReset replace tabIndex={-1} to='.?uncloak'>
                {uncloak && <GameBoardCellLock />}
                <AriaLabel>
                  <FormattedMessage id={MESSAGE_ID_BY_BOARD_CELL_STATE[cell.state]} />
                  <FormattedMessage id='gameBoardLockedCellLabel' />
                  {highlighted && <FormattedMessage id='gameBoardHighlightedCellLabel' />}
                </AriaLabel>
              </HistoryLink>
            ) : (
              <HistoryLink preventScrollReset replace to={`/game/${getNextBoard(board, { x, y }).toString()}`}>
                <AriaLabel>
                  <FormattedMessage id={MESSAGE_ID_BY_BOARD_CELL_STATE[cell.state]} />
                  {highlighted && <FormattedMessage id='gameBoardHighlightedCellLabel' />}
                </AriaLabel>
              </HistoryLink>
            )}
          </GameBoardCell>
        </AriaLabelled>,
      );
    }
  }

  return children;
}

export function GameActionsContent() {
  return (
    <AriaLabelled>
      <ButtonLink replace size='icon' to='.?analyze' variant='ghost'>
        <HelpCircle aria-hidden />
        <AriaLabel>
          <FormattedMessage id='gameAnalyzeActionLabel' />
        </AriaLabel>
      </ButtonLink>
    </AriaLabelled>
  );
}

export function GamePraiseModalContent({ seed, size }: { seed: number; size: number }) {
  return (
    <>
      <GameModalHeader>
        <FormattedMessage id={sample(PRAISE_MESSAGE_IDS, new Random(seed))} />
      </GameModalHeader>
      <GameModalFooter>
        <ButtonLink prefetch='render' replace to={`/game/new/${size}`} variant='primary'>
          <FormattedMessage id='gameAgainLink' />
        </ButtonLink>
        <ButtonLink history={false} replace to='/' variant='secondary'>
          <FormattedMessage id='gameMenuLink' />
        </ButtonLink>
      </GameModalFooter>
    </>
  );
}
