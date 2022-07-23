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
      left: [],
      right: [],
    },
  },
]
