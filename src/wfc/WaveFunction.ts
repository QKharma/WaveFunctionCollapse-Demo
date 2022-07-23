import { getRandomInteger } from '../lib/math'
import { Tile } from './tiles'

export class WaveFunction {
  private grid: Cell[][]
  private gridSize: number

  constructor(gridSize: number, tiles: Tile[]) {
    this.grid = []
    this.gridSize = gridSize
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
    //this.grid.reduce(
    //  (sum, current) =>
    //    sum + current.filter((c) => c.getRemainingTiles.length > 1).length,
    //  0
    //) > 1

    while (true) {
      //TODO: just check array length instead of reduce in loop
      let lowestPossibilityCells: { x: number; y: number; cell: Cell }[] = []
      let lowestPossibilities = Infinity
      for (let y = 0; y < this.gridSize; y++) {
        for (let x = 0; x < this.gridSize; x++) {
          let cell = this.grid[y][x]
          if (cell.getRemainingTiles.length < lowestPossibilities) {
            lowestPossibilityCells = []
            lowestPossibilities = cell.getRemainingTiles.length
            lowestPossibilityCells.push({ x, y, cell })
          } else if (cell.getRemainingTiles.length === lowestPossibilities) {
            lowestPossibilityCells.push({ x, y, cell })
          }
        }
      }

      let editedCell: { x: number; y: number; cell: Cell } | null = null
      if (lowestPossibilityCells.length === 1) {
        editedCell = lowestPossibilityCells[0]
      } else {
        editedCell =
          lowestPossibilityCells[
            getRandomInteger(lowestPossibilityCells.length)
          ]
      }

      console.log(editedCell)

      if (editedCell) {
        editedCell.cell.chooseRandomTile()
        break
      } else {
        break
      }
    }
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

  chooseRandomTile() {
    this.remainingTiles = [
      this.remainingTiles[getRandomInteger(this.remainingTiles.length)],
    ]
  }
}
