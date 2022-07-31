export interface Tile {
  id: number
  name: string
  imagePath: string
  constraints: {
    up: Condition
    down: Condition
    left: Condition
    right: Condition
  }
}

export enum Condition {
  Grass,
  Road,
}

export const Tiles: Tile[] = [
  {
    id: 1,
    name: 'tile1',
    imagePath: 'tiles/tile1.png',
    constraints: {
      up: Condition.Road,
      down: Condition.Road,
      left: Condition.Grass,
      right: Condition.Grass,
    },
  },
  {
    id: 2,
    name: 'tile2',
    imagePath: 'tiles/tile2.png',
    constraints: {
      up: Condition.Grass,
      down: Condition.Grass,
      left: Condition.Road,
      right: Condition.Road,
    },
  },
  {
    id: 3,
    name: 'tile3',
    imagePath: 'tiles/tile3.png',
    constraints: {
      up: Condition.Road,
      down: Condition.Road,
      left: Condition.Road,
      right: Condition.Road,
    },
  },
  {
    id: 4,
    name: 'tile4',
    imagePath: 'tiles/tile4.png',
    constraints: {
      up: Condition.Road,
      down: Condition.Road,
      left: Condition.Road,
      right: Condition.Grass,
    },
  },
  {
    id: 5,
    name: 'tile5',
    imagePath: 'tiles/tile5.png',
    constraints: {
      up: Condition.Road,
      down: Condition.Road,
      left: Condition.Grass,
      right: Condition.Road,
    },
  },
  {
    id: 6,
    name: 'tile6',
    imagePath: 'tiles/tile6.png',
    constraints: {
      up: Condition.Grass,
      down: Condition.Road,
      left: Condition.Grass,
      right: Condition.Grass,
    },
  },
]
