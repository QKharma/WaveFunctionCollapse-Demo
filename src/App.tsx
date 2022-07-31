import ImageBuilder from './components/ImageBuilder'
import TileView from './components/TileView'

function App() {
  return (
    <div className='h-screen bg-gray-900 flex flex-row justify-center items-center space-x-20 overflow-x-auto relative'>
      <div className='min-w-max left-0'>
        <TileView />
      </div>
      <div className='min-w-max '>
        <ImageBuilder />
      </div>
    </div>
  )
}

export default App
