import React, {useState} from 'react'
import VenueGallery from './Components/Featured/VenueGallery'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar'
import FeaturedVenues from './Components/Featured/FeaturedVenues'
import Footer from './Components/Footer/Footer'
import BoxInfo from './Components/BoxInfo/BoxInfo'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Breadcrumb from './Components/Navbar/Breadcrumb'
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) 




  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <div >
        <Navbar/>
        <Hero/>
        <Footer />
      </div>
      },
      {
        path: '/venues',
        element: <div>
          <Navbar/>
          <FeaturedVenues />
        </div>
      },
      {
        path:'/venues/box/',
        children : [
          {
            path : '',
            element:<div>
              <Navbar/>
              <Breadcrumb/>
            </div>
          },
          {
            path : ':id',
            element:<div>
              <Navbar/>
              <BoxInfo/>
            </div>
          }
        ]
      }

    ]
  )
  return (
    <RouterProvider router={router}>

    </RouterProvider>
    
  )
}

export default App
