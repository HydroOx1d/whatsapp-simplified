import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Main from './pages/Main'
import FullChat from './components/FullChat/FullChat'
import Welcome from './components/welcome/Welcome'

function App() {
  return (
    <div className="app">
      <div className="wrapper">
        <div className='main'>
          <Routes>
            <Route path='/' element={<Main/>}>
              <Route index element={<Welcome/>}/>
              <Route path='chat/:chatId' element={<FullChat/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/"/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
