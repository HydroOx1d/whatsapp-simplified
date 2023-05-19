import './App.css'
import FullChat from './components/FullChat/FullChat'
import Sidebar from './components/sidebar/Sidebar'

function App() {

  return (
    <div className="app">
      <div className="wrapper">
        <div className='main'>
          <Sidebar/>
          <FullChat/>
        </div>
      </div>
    </div>
  )
}

export default App
