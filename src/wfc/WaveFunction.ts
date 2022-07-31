import { arrayBuffer } from 'stream/consumers'
import { getRandomInteger } from '../lib/math'
import { Tile } from './Tiles'

enum Direction {
  left,
  right,
  up,
  down,
}

type Pos = {
  x: number
  y: number
}

type CellValues = {
  pos: Pos
  remainingTiles: Tile[]
}

export class WaveFunction {
  private grid: Cell[][]
  private gridSize: number
  private history: CellValues[][]

  constructor(gridSize: number, tiles: Tile[]) {
    this.grid = []
    this.gridSize = gridSize
    for (let y = 0; y < gridSize; y++) {
      let row = []
      for (let x = 0; x < gridSize; x++) {
        row.push(new Cell(x, y, tiles))
      }
      this.grid.push(row)
    }
    this.history = []
  }

  getGrid() {
    return this.grid
  }

  getNeighbourCells(cell: Cell) {
    let pos = cell.getPos()
    let v: { y: number; x: number; dir: Direction }[] = [
      { x: 0, y: -1, dir: Direction.up },
      { x: 0, y: 1, dir: Direction.down },
      { x: -1, y: 0, dir: Direction.left },
      { x: 1, y: 0, dir: Direction.right },
    ]
    let neighbours: { cell: Cell; dir: Direction }[] = []
    v.filter(
      ({ y, x, dir }) =>
        y + pos.y >= 0 &&
        y + pos.y < this.gridSize &&
        x + pos.x >= 0 &&
        x + pos.x < this.gridSize
    ).forEach(({ y, x, dir }) => {
      neighbours.push({ cell: this.grid[y + pos.y][x + pos.x], dir: dir })
    })

    return neighbours
  }

  saveGridState() {
    this.history = this.grid.map((r) => [...r.map((c) => c.copyValues())])
  }

  rollbackGridState() {
    this.grid = this.history.map((r) =>
      r.map((c) => new Cell(c.pos.x, c.pos.y, c.remainingTiles))
    )
  }

  reduceNeighbours(editedCell: Cell) {
    let neighbours = this.getNeighbourCells(editedCell)
    neighbours.forEach((n) => {
      let wasReduced = false
      n.cell.getRemainingTiles().forEach((t) => {
        if (n.dir === Direction.left) {
          let matches = editedCell
            ?.getRemainingTiles()
            .filter((rt) => t.constraints.right.includes(rt.id))
          if (matches?.length === 0) {
            n.cell.removePossibility(t.id)
            wasReduced = true
          }
        }
        if (n.dir === Direction.right) {
          let matches = editedCell
            ?.getRemainingTiles()
            .filter((rt) => t.constraints.left.includes(rt.id))
          if (matches?.length === 0) {
            n.cell.removePossibility(t.id)
            wasReduced = true
          }
        }
        if (n.dir === Direction.up) {
          let matches = editedCell
            ?.getRemainingTiles()
            .filter((rt) => t.constraints.down.includes(rt.id))
          if (matches?.length === 0) {
            n.cell.removePossibility(t.id)
            wasReduced = true
          }
        }
        if (n.dir === Direction.down) {
          let matches = editedCell
            ?.getRemainingTiles()
            .filter((rt) => t.constraints.up.includes(rt.id))
          if (matches?.length === 0) {
            n.cell.removePossibility(t.id)
            wasReduced = true
          }
        }
      })
      if (wasReduced) {
        this.reduceNeighbours(n.cell)
      }
    })
  }

  collapse() {
    this.saveGridState()
    while (
      this.grid.reduce(
        (sum, current) =>
          sum + current.filter((c) => c.getPossibilitiesCount() > 1).length,
        0
      ) > 0
    ) {
      this.saveGridState()

      let lowestPossibilityCells: Cell[] = []
      let lowestPossibilities = Infinity
      for (let y = 0; y < this.gridSize; y++) {
        for (let x = 0; x < this.gridSize; x++) {
          let cell = this.grid[y][x]
          if (cell.getPossibilitiesCount() === 1) {
            continue
          } else if (cell.getPossibilitiesCount() < lowestPossibilities) {
            lowestPossibilityCells = []
            lowestPossibilities = cell.getPossibilitiesCount()
            lowestPossibilityCells.push(cell)
          } else if (cell.getPossibilitiesCount() === lowestPossibilities) {
            lowestPossibilityCells.push(cell)
          }
        }
      }

      let editedCell: Cell | null = null
      if (lowestPossibilityCells.length === 1) {
        editedCell = lowestPossibilityCells[0]
      } else {
        editedCell =
          lowestPossibilityCells[
            getRandomInteger(lowestPossibilityCells.length)
          ]
      }

      editedCell.chooseRandomTile()
      this.reduceNeighbours(editedCell)

      rollbackCheck: for (const row of this.grid) {
        for (const cell of row) {
          if (cell.getPossibilitiesCount() === 0) {
            this.rollbackGridState()
            break rollbackCheck
          }
        }
      }
    }
  }
}

class Cell {
  private pos: Pos
  private remainingTiles: Tile[]

  constructor(x: number, y: number, tiles: Tile[]) {
    this.remainingTiles = tiles
    this.pos = { x: x, y: y }
  }

  getPos() {
    return this.pos
  }

  getRemainingTiles() {
    return this.remainingTiles
  }

  getPossibilitiesCount() {
    return this.remainingTiles.length
  }

  removePossibility(id: number) {
    this.remainingTiles = this.remainingTiles.filter((t) => t.id !== id)
    return this.remainingTiles.length
  }

  chooseRandomTile() {
    this.remainingTiles = [
      this.remainingTiles[getRandomInteger(this.remainingTiles.length)],
    ]
  }

  copyValues() {
    return { pos: this.pos, remainingTiles: this.remainingTiles }
  }
}
