import ImageBuilder from './components/ImageBuilder'
import TileView from './components/TileView'

function App() {
  return (
    <div className='h-min-screen bg-gray-900 grid grid-rows-2 place-items-center overflow-y-auto'>
      <TileView />
      <ImageBuilder />
    </div>
  )
}

export default App
