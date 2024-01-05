import { type Matrix, type MatrixCell } from './matrix';
import { type MatrixLine } from './matrix-line';

export interface MatrixSelectionCoords {
  readonly x: number;
  readonly y: number;
}

export class MatrixSelection {
  readonly #data: readonly MatrixSelectionCoords[];

  constructor(data: readonly MatrixSelectionCoords[]) {
    this.#data = data;
  }

  static from<M extends Matrix<MatrixLine<unknown>>>(matrix: M, cells: ReadonlyArray<MatrixCell<M>>) {
    const data: MatrixSelectionCoords[] = [];

    for (const [y, line] of matrix.entries()) {
      for (const [x, cell] of line.entries()) {
        for (const other of cells) {
          if (cell === other) {
            data.push({ x, y });
          }
        }
      }
    }

    return new this(data);
  }

  execute<M extends Matrix<MatrixLine<unknown>>>(matrix: M) {
    const cells: Array<MatrixCell<M>> = [];

    for (const coords of this.#data) {
      const line = matrix.at(coords.y);

      if (line === undefined) {
        continue;
      }

      const cell = line.at(coords.x);

      if (cell === undefined) {
        continue;
      }

      cells.push(cell as MatrixCell<M>);
    }

    return cells;
  }

  valueOf() {
    return this.#data;
  }
}
