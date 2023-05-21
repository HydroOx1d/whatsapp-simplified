import { Navigate, Route, Routes } from 'react-router-dom'
import MainPage from '../pages/Main'
import Welcome from '../components/welcome/Welcome'
import FullChat from '../components/FullChat/FullChat'
import LoginPage from '../pages/Login'
import AuthCheck from './AuthCheck'

const AppRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthCheck><MainPage /></AuthCheck>}>
        <Route index element={<Welcome />} />
        <Route path='chat/:chatId' element={<FullChat />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoute