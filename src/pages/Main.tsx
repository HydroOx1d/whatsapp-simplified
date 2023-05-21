import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const MainPage = () => {
  return (
    <>
      <Sidebar/>
      <Outlet/>
    </>
  )
}

export default MainPage