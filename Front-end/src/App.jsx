import React, {useState} from 'react'
import VenueGallery from './Components/Featured/VenueGallery'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar'
import FeaturedVenues from './Components/Featured/FeaturedVenues'
import Footer from './Components/Footer/Footer'
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (

    <div >
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <Hero/>
      <Footer />
    </div>
  )
}

export default App
