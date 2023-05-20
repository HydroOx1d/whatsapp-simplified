import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <>
      <Sidebar/>
      <Outlet/>
    </>
  )
}

export default Main