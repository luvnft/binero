import { BoardCellState } from '~/lib/board';
import { type Messages } from '~/services/intl';

export const MESSAGE_ID_BY_BOARD_CELL_STATE: Readonly<Record<BoardCellState, keyof Messages>> = {
  [BoardCellState.B]: 'gameBoardBCellLabel',
  [BoardCellState.E]: 'gameBoardECellLabel',
  [BoardCellState.R]: 'gameBoardRCellLabel',
};

export const PRAISE_MESSAGE_IDS: ReadonlyArray<keyof Messages> = [
  'gamePraiseMessage0',
  'gamePraiseMessage1',
  'gamePraiseMessage2',
  'gamePraiseMessage3',
  'gamePraiseMessage4',
  'gamePraiseMessage5',
  'gamePraiseMessage6',
  'gamePraiseMessage7',
  'gamePraiseMessage8',
  'gamePraiseMessage9',
  'gamePraiseMessage10',
  'gamePraiseMessage11',
  'gamePraiseMessage12',
  'gamePraiseMessage13',
  'gamePraiseMessage14',
  'gamePraiseMessage15',
  'gamePraiseMessage16',
  'gamePraiseMessage17',
  'gamePraiseMessage18',
  'gamePraiseMessage19',
];
