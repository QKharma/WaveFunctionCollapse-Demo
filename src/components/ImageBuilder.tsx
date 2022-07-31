import { useEffect, useRef, useState } from 'react'
import { loadImage } from '../lib/image'
import { Tiles } from '../wfc/Tiles'
import { WaveFunction } from '../wfc/WaveFunction'

const ImageBuilder = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [gridSize, setGridSize] = useState(10)
  const [images, setImages] = useState<
    { name: string; image: CanvasImageSource }[]
  >([])

  const loadImages = async () => {
    let images: { name: string; image: CanvasImageSource }[] = []

    for (const t of Tiles) {
      images.push({ name: t.name, image: await loadImage(t.imagePath) })
    }

    setImages(images)
  }

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.height = 608
    canvas.width = 608
    const context = canvas.getContext('2d')
    if (!context) return
    context.imageSmoothingEnabled = false
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    if (images) {
      generateImage()
    }
  }, [gridSize, images])

  const generateImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawImage(canvas, gridSize, images)
  }

  return (
    <div className='flex flex-col items-center space-y-4'>
      <canvas ref={canvasRef}></canvas>
      <div>
        <button className='text-black bg-gray-300 p-3' onClick={generateImage}>
          Generate
        </button>
        <input
          type='range'
          min='4'
          max='100'
          value={gridSize}
          onChange={(e) => setGridSize(e.target.valueAsNumber)}
        ></input>
      </div>
    </div>
  )
}

const drawImage = async (
  canvas: HTMLCanvasElement,
  gridSize: number,
  images: { name: string; image: CanvasImageSource }[],
  debug: boolean = false
) => {
  const context = canvas.getContext('2d')
  if (!context) return

  const tileWidth = canvas.width / gridSize
  const tileHeight = canvas.height / gridSize
  const waveFunction = new WaveFunction(gridSize, Tiles)
  waveFunction.collapse()

  const grid = waveFunction.getGrid()

  context.font = '30px Arial'
  context.fillStyle = '#000000'

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      try {
        let tile = images.find(
          (i) => i.name === grid[y][x].getRemainingTiles()[0].name
        )
        if (tile) {
          context.drawImage(
            tile.image,
            x * tileWidth,
            y * tileHeight,
            tileWidth,
            tileHeight
          )
        }
      } catch {
        console.log('error')
      }

      if (debug) {
        context.fillText(
          `${x}, ${y}`,
          x * tileWidth + tileWidth / 2 - 25,
          y * tileHeight + tileHeight / 2
        )
      }
    }
  }
}

export default ImageBuilder
