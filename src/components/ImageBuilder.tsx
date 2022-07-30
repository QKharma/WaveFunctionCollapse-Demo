import { useEffect, useRef } from 'react'
import { loadImage } from '../lib/image'
import { Tiles } from '../wfc/Tiles'
import { WaveFunction } from '../wfc/WaveFunction'

const ImageBuilder = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.height = 800
    canvas.width = 800
    const context = canvas.getContext('2d')
    if (!context) return
    context.imageSmoothingEnabled = false
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    generateImage()
  }, [])

  const generateImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    drawImage(canvas)
  }

  return (
    <div className='flex flex-col items-center space-y-4'>
      <canvas ref={canvasRef}></canvas>
      <div>
        <button className='text-black bg-gray-300 p-3' onClick={generateImage}>
          Generate
        </button>
      </div>
    </div>
  )
}

const drawImage = async (canvas: HTMLCanvasElement) => {
  const gridSize = 5

  const context = canvas.getContext('2d')
  if (!context) return

  for (let i = 1; i < gridSize; i++) {
    context.beginPath()
    context.moveTo(0, (canvas.height * i) / gridSize)
    context.lineTo(canvas.width, (canvas.height * i) / gridSize)
    context.stroke()
  }

  for (let i = 1; i < gridSize; i++) {
    context.beginPath()
    context.moveTo((canvas.height * i) / gridSize, 0)
    context.lineTo((canvas.height * i) / gridSize, canvas.height)
    context.stroke()
  }

  const tileWidth = canvas.width / gridSize
  const tileHeight = canvas.height / gridSize
  const waveFunction = new WaveFunction(gridSize, Tiles)
  waveFunction.collapse()

  const grid = waveFunction.getGrid()

  //debugging help
  //context.font = '30px Arial'
  //context.fillStyle = '#000000'

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      //console.log(grid[x][y])
      let tile = await loadImage(grid[y][x].getRemainingTiles()[0].imagePath)
      context.drawImage(
        tile,
        x * tileWidth,
        y * tileHeight,
        tileWidth,
        tileHeight
      )
      /*
      context.fillText(
        `${x}, ${y}`,
        x * tileWidth + tileWidth / 2 - 25,
        y * tileHeight + tileHeight / 2
      )
      */
    }
  }
}

export default ImageBuilder
