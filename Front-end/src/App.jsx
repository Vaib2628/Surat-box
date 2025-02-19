import React, {useState} from 'react'
import VenueGallery from './Components/Featured/VenueGallery'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar'
import FeaturedVenues from './Components/Featured/FeaturedVenues'
import Footer from './Components/Footer/Footer'
const App = () => {
  
  return (
    <div >
      <Navbar/>
      <Hero/>
      <FeaturedVenues/>
      <Footer />
    </div>
  )
}

export default App
