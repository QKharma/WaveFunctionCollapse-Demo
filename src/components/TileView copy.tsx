import { Tile, Tiles } from '../wfc/Tiles'

const TileView = () => {
  interface TileElementProps {
    tile: Tile
  }

  const TileElement = (props: TileElementProps) => {
    return (
      <div
        className='flex flex-row p-2 rounded-xl border-2 justify-between'
        key={props.tile.id}
      >
        <p className='text-white'>{props.tile.name}</p>
        <img
          src={props.tile.imagePath}
          className='w-[32px] h-[32px]'
          alt={props.tile.name}
        />
      </div>
    )
  }

  return (
    <div className='p-4 w-1/2'>
      <li className='space-y-2 list-none'>
        {Tiles.map((t) => (
          <TileElement tile={t} />
        ))}
      </li>
    </div>
  )
}

export default TileView
