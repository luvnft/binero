import { type Matrix, type MatrixCell } from './matrix';
import { type MatrixLine } from './matrix-line';

export interface MatrixSelectionPosition {
  readonly x: number;
  readonly y: number;
}

export class MatrixSelection {
  readonly #positions: readonly MatrixSelectionPosition[];

  constructor(positions: readonly MatrixSelectionPosition[]) {
    this.#positions = positions;
  }

  static from<M extends Matrix<MatrixLine<unknown>>>(matrix: M, cells: ReadonlyArray<MatrixCell<M>>) {
    const positions: MatrixSelectionPosition[] = [];

    for (const [y, line] of matrix.entries()) {
      for (const [x, cell] of line.entries()) {
        for (const other of cells) {
          if (cell === other) {
            positions.push({ x, y });
          }
        }
      }
    }

    return new this(positions);
  }

  execute<M extends Matrix<MatrixLine<unknown>>>(matrix: M) {
    const cells: Array<MatrixCell<M>> = [];

    for (const position of this.#positions) {
      const line = matrix.at(position.y);

      if (line === undefined) {
        continue;
      }

      const cell = line.at(position.x);

      if (cell === undefined) {
        continue;
      }

      cells.push(cell as MatrixCell<M>);
    }

    return cells;
  }

  valueOf() {
    return this.#positions;
  }
}
