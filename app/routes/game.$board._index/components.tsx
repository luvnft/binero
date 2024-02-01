import { HelpCircle } from 'lucide-react';
import { type ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { HistoryLink } from '~/components/base/history-link';
import { ButtonLink } from '~/components/ui/button-link';
import { GameBoardAnalyzerReview } from '~/components/ui/game-board-analyzer-review';
import { GameBoardCell } from '~/components/ui/game-board-cell';
import { GameBoardCellLock } from '~/components/ui/game-board-cell-lock';
import { GameModalFooter } from '~/components/ui/game-modal-footer';
import { GameModalHeader } from '~/components/ui/game-modal-header';
import { type Board } from '~/lib/board';
import { type BoardAnalyzerReview } from '~/lib/board-analyzer';
import { type MatrixSelectionCoords } from '~/lib/matrix';
import { getNextBoard } from '~/services/game';
import { Random, sample } from '~/shared/random';

import { PRAISE_MESSAGE_IDS } from './constants';

export function GameTipContent({ boardAnalyzerReview }: { boardAnalyzerReview?: BoardAnalyzerReview }) {
  return (
    boardAnalyzerReview !== undefined && (
      <GameBoardAnalyzerReview payload={boardAnalyzerReview.payload} reason={boardAnalyzerReview.reason} />
    )
  );
}

export function GameBoardContent({
  board,
  boardAnalyzerReviewPayloadData,
  uncloak,
}: {
  board: Board;
  boardAnalyzerReviewPayloadData: readonly MatrixSelectionCoords[];
  uncloak: boolean;
}) {
  const children: ReactNode[] = [];

  for (const [y, line] of board.entries()) {
    for (const [x, cell] of line.entries()) {
      const key = `${x}-${y}`;
      const highlighted = boardAnalyzerReviewPayloadData.some((coords) => coords.x === x && coords.y === y);
      const locked = cell.isFixed;

      children.push(
        <GameBoardCell asChild highlighted={highlighted} key={key} locked={locked} state={cell.state}>
          {locked ? (
            <HistoryLink preventScrollReset replace tabIndex={-1} to='.?uncloak'>
              {uncloak && <GameBoardCellLock />}
            </HistoryLink>
          ) : (
            <HistoryLink preventScrollReset replace to={`/game/${getNextBoard(board, { x, y }).toString()}`} />
          )}
        </GameBoardCell>,
      );
    }
  }

  return children;
}

export function GameActionsContent() {
  return (
    <ButtonLink replace size='icon' to='.?analyze' variant='ghost'>
      <HelpCircle />
    </ButtonLink>
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
