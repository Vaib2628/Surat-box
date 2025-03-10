import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
const ChildOutlet = () => {
  return (
    <div>
        <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default ChildOutlet
