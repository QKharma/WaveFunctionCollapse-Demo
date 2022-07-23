import { Tile } from './tiles'

export class WaveFunction {
  private grid: Cell[][]

  constructor(gridSize: number, tiles: Tile[]) {
    this.grid = []
    for (let y = 0; y < gridSize; y++) {
      let row = []
      for (let x = 0; x < gridSize; x++) {
        row.push(new Cell(tiles))
      }
      this.grid.push(row)
    }
  }

  getGrid() {
    return this.grid
  }

  getNeighbourCells(x: number, y: number) {
    return [
      this.grid[x - 1][y],
      this.grid[x + 1][y],
      this.grid[x][y - 1],
      this.grid[x][y + 1],
    ]
  }

  collapse() {
    while (
      this.grid.reduce(
        (sum, current) =>
          sum + current.filter((c) => c.getRemainingTiles.length > 1).length,
        0
      ) > 1
    ) {}
  }
}

class Cell {
  private remainingTiles: Tile[]

  constructor(tiles: Tile[]) {
    this.remainingTiles = tiles
  }

  getRemainingTiles() {
    return this.remainingTiles
  }

  removePossibility(id: number) {
    this.remainingTiles = this.remainingTiles.filter((t) => t.id !== id)
  }
}
