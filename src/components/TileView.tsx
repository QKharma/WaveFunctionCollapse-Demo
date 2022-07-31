import { useEffect, useRef, useState } from 'react'
import { loadImage } from '../lib/image'
import { Tile, Tiles } from '../wfc/Tiles'

const TileView = () => {
  const [selectedTile, setSelectedTile] = useState<Tile>(Tiles[0])
  const [upTiles, setUpTiles] = useState<Tile[]>([])
  const [leftTiles, setLeftTiles] = useState<Tile[]>([])
  const [rightTiles, setRightTiles] = useState<Tile[]>([])
  const [downTiles, setDownTiles] = useState<Tile[]>([])

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const renderLines = () => {
    let tileView = document.getElementById('tileView')?.getBoundingClientRect()

    const canvas = canvasRef.current
    if (!canvas) return
    if (tileView) {
      canvas.height = tileView?.height
      canvas.width = tileView?.width
    }
    const context = canvas.getContext('2d')
    if (!context) return
    context.imageSmoothingEnabled = false

    let up = document.getElementById('up')?.getBoundingClientRect()
    let left = document.getElementById('left')?.getBoundingClientRect()
    let right = document.getElementById('right')?.getBoundingClientRect()
    let down = document.getElementById('down')?.getBoundingClientRect()
    let tile = document.getElementById('tile')?.getBoundingClientRect()

    if (up && left && right && down && tile && tileView) {
      context.lineWidth = 3
      context.strokeStyle = 'white'

      //up -> tile
      context.beginPath()
      context.moveTo(
        up.x + up.width / 2 - tileView.x,
        up.y + up.height - tileView.y
      )
      context.lineTo(tile.x + tile.width / 2 - tileView.x, tile.y - tileView.y)
      context.stroke()

      //left -> tile
      context.beginPath()
      context.moveTo(
        left.x + left.width - tileView.x,
        left.y + left.height / 2 - tileView.y
      )
      context.lineTo(tile.x - tileView.x, tile.y + tile.height / 2 - tileView.y)
      context.stroke()

      //right -> tile
      context.beginPath()
      context.moveTo(
        right.x - tileView.x,
        right.y + right.height / 2 - tileView.y
      )
      context.lineTo(
        tile.x + tile.width - tileView.x,
        tile.y + tile.height / 2 - tileView.y
      )
      context.stroke()

      //down -> tile
      context.beginPath()
      context.moveTo(down.x + down.width / 2 - tileView.x, down.y - tileView.y)
      context.lineTo(
        tile.x + tile.width / 2 - tileView.x,
        tile.y + tile.height - tileView.y
      )
      context.stroke()
    }
  }

  useEffect(() => {
    window.addEventListener('resize', renderLines)
    return () => {
      window.removeEventListener('resize', renderLines)
    }
  }, [])

  useEffect(() => {
    setUpTiles(Tiles.filter((t) => selectedTile.constraints.up.includes(t.id)))
    setLeftTiles(
      Tiles.filter((t) => selectedTile.constraints.left.includes(t.id))
    )
    setRightTiles(
      Tiles.filter((t) => selectedTile.constraints.right.includes(t.id))
    )
    setDownTiles(
      Tiles.filter((t) => selectedTile.constraints.down.includes(t.id))
    )
  }, [selectedTile])

  useEffect(() => {
    renderLines()
  }, [upTiles, leftTiles, rightTiles, downTiles])

  const PossibleTiles = (props: {
    id: string
    tiles: Tile[]
    chooseTile: (tile: Tile) => void
  }) => {
    return (
      <div
        id={props.id}
        className='border-2 rounded-xl p-4 grid grid-cols-3 place-items-center'
      >
        {props.tiles.map((t) => (
          <div className='m-2 relative' key={t.name}>
            <img
              className='max-w-none'
              src={t.imagePath}
              alt={t.name}
              height={32}
              width={32}
            />
            <button
              className='absolute inset-0 h-8 w-8 hover:bg-black opacity-50'
              onClick={() => props.chooseTile(t)}
            >
              <p className='sr-only'>Choose {t.name}</p>
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='relative'>
      <div className='absolute inset-0 pointer-events-none'>
        <canvas ref={canvasRef} />
      </div>
      <div
        id='tileView'
        className='p-4 grid grid-cols-3 place-items-center gap-x-20 gap-y-20'
      >
        <div></div>
        <PossibleTiles id='up' tiles={upTiles} chooseTile={setSelectedTile} />
        <div></div>
        <PossibleTiles
          id='left'
          tiles={leftTiles}
          chooseTile={setSelectedTile}
        />
        <div id='tile' className='border-2 rounded-xl p-10'>
          <img
            className='max-w-none'
            src={selectedTile.imagePath}
            alt={selectedTile.name}
            height={64}
            width={64}
          ></img>
        </div>
        <PossibleTiles
          id='right'
          tiles={rightTiles}
          chooseTile={setSelectedTile}
        />
        <div></div>
        <PossibleTiles
          id='down'
          tiles={downTiles}
          chooseTile={setSelectedTile}
        />
        <div></div>
      </div>
    </div>
  )
}

export default TileView
