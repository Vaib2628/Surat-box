import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import ScrollToTop from './ScrollToTop'
const ChildOutlet = () => {
  return (
    <div>
      <ScrollToTop/>
        <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default ChildOutlet
