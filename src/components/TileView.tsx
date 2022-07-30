import { useEffect, useRef, useState } from 'react'
import { loadImage } from '../lib/image'
import { Tile, Tiles } from '../wfc/Tiles'

const TileView = () => {
  const [selectedTile, setSelectedTiles] = useState<Tile>(Tiles[0])
  const [upTiles, setUpTiles] = useState<Tile[]>([])
  const [leftTiles, setLeftTiles] = useState<Tile[]>([])
  const [rightTiles, setRightTiles] = useState<Tile[]>([])
  const [downTiles, setDownTiles] = useState<Tile[]>([])

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

  const NearestRenderedTile = (props: {
    path: string
    height: number
    width: number
  }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const drawTile = async (
      context: CanvasRenderingContext2D,
      imagePath: string,
      h: number,
      w: number
    ) => {
      let tile = await loadImage(imagePath)
      context.drawImage(tile, w, h)
    }

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.height = props.height
      canvas.width = props.width

      const context = canvas.getContext('2d')
      if (!context) return

      context.imageSmoothingEnabled = false
      drawTile(context, props.path, canvas.height, canvas.width)
    }, [])

    return <canvas ref={canvasRef} />
  }

  const PossibleTiles = (props: { tiles: Tile[] }) => {
    return (
      <div
        id={props.tiles.toString()}
        className='border-2 rounded-xl p-10 grid grid-cols-3 place-items-center'
      >
        {props.tiles.map((t) => (
          <div className='p-2'>
            <img src={t.imagePath} alt={t.name} height={32} width={32} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='p-4 grid grid-cols-3 grid-rows-3 place-items-center space-x-20 space-y-20'>
      <div></div>
      <PossibleTiles tiles={upTiles} />
      <div></div>
      <PossibleTiles tiles={leftTiles} />
      <div id='tile' className='border-2 rounded-xl p-10'>
        <img
          src={selectedTile.imagePath}
          alt={selectedTile.name}
          height={64}
          width={64}
        ></img>
      </div>
      <PossibleTiles tiles={rightTiles} />
      <div></div>
      <PossibleTiles tiles={downTiles} />
      <div></div>
    </div>
  )
}

export default TileView
