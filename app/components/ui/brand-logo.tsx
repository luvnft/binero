import { GameBoard } from '~/components/ui/game-board';
import { GameBoardCell } from '~/components/ui/game-board-cell';
import { type BoardCellState } from '~/lib/board';

export function BrandLogo({ states }: { states: BoardCellState[] }) {
  return (
    <div className='mx-auto flex w-2/3 justify-center'>
      <GameBoard size={states.length / 2}>
        {states.map((state, index) => (
          <GameBoardCell key={index} state={state} />
        ))}
      </GameBoard>
    </div>
  );
}
