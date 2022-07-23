import ImageBuilder from './components/ImageBuilder'

function App() {
  return (
    <div className='h-screen bg-gray-900'>
      <div className='flex flex-col items-center'>
        <ImageBuilder />
        <div>
          <button className='text-white'>Test</button>
        </div>
      </div>
    </div>
  )
}

export default App
