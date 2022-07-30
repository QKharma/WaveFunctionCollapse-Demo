import ImageBuilder from './components/ImageBuilder'
import TileView from './components/TileView'

function App() {
  return (
    <div className='h-screen bg-gray-900 grid grid-cols-2 place-items-center'>
      <TileView />
      <ImageBuilder />
    </div>
  )
}

export default App
