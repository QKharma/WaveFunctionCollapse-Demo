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
    imagePath: 'tiles/tile1.png',
    constraints: {
      up: [1, 3, 4, 5, 6],
      down: [1, 3, 4, 5],
      left: [1, 4, 6],
      right: [1, 5, 6],
    },
  },
  {
    id: 2,
    name: 'tile2',
    imagePath: 'tiles/tile2.png',
    constraints: {
      up: [2],
      down: [2, 6],
      left: [2, 3, 5],
      right: [2, 3, 4],
    },
  },
  {
    id: 3,
    name: 'tile3',
    imagePath: 'tiles/tile3.png',
    constraints: {
      up: [1, 3, 4, 5, 6],
      down: [1, 3, 4, 5],
      left: [2, 3, 5],
      right: [2, 3, 4],
    },
  },
  {
    id: 4,
    name: 'tile4',
    imagePath: 'tiles/tile4.png',
    constraints: {
      up: [1, 3, 5, 6],
      down: [1, 3, 5],
      left: [2, 3, 5],
      right: [1, 5, 6],
    },
  },
  {
    id: 5,
    name: 'tile5',
    imagePath: 'tiles/tile5.png',
    constraints: {
      up: [1, 3, 4, 6],
      down: [1, 3, 4],
      left: [1, 4, 6],
      right: [2, 3, 4],
    },
  },
  {
    id: 6,
    name: 'tile6',
    imagePath: 'tiles/tile6.png',
    constraints: {
      up: [2],
      down: [1, 3, 4, 5],
      left: [1, 4],
      right: [1, 5],
    },
  },
]
