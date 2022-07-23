export interface Tile {
  id: number
  name: string
  imagePath: string
  constraints: {
    up: number[]
    down: number[]
    left: number[]
    right: number[]
  }
}

export const Tiles: Tile[] = [
  {
    id: 1,
    name: 'tile1',
    imagePath: 'tile1.png',
    constraints: {
      up: [1],
      down: [1],
      left: [1],
      right: [1],
    },
  },
  {
    id: 2,
    name: 'tile2',
    imagePath: 'tile2.png',
    constraints: {
      up: [2],
      down: [2],
      left: [2],
      right: [2],
    },
  },
  {
    id: 3,
    name: 'tile3',
    imagePath: 'tile3.png',
    constraints: {
      up: [1],
      down: [1],
      left: [2],
      right: [2],
    },
  },
]
