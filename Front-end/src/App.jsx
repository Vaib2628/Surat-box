import React, {useState} from 'react'
import { Analytics } from "@vercel/analytics/react"
import VenueGallery from './Components/Featured/VenueGallery'
import Hero from './Components/Hero/Hero'
import Navbar from './Components/Navbar/Navbar'
import FeaturedVenues from './Components/Featured/FeaturedVenues'
import Footer from './Components/Footer/Footer'
import BoxInfo from './Components/BoxInfo/BoxInfo'
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom'
import Breadcrumb from './Components/Navbar/Breadcrumb'
import AllVenues from './Components/Venues/AllVenues'
import AdminDashboard from './Components/Bookings/AdminDashboard'
import TurfBooking from './Components/Bookings/TurfBooking'
import AdminLogin from './Components/Bookings/AdminLogin'
import AuthPopup from './Components/Logins/AuthPopup'
import AboutPage from './Components/About/AboutPage'
import ChildOutlet from './Components/ChildOutlet'
import ContactPage from './Components/Contact/ContactPage'
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) 
  


  const router = createBrowserRouter(
    [ {
      path : "/",
      element : <div><ChildOutlet/></div>,
      children :[
        {
          path : '',
          element : <Hero/>
        },
        {
          path : 'about',
          element : <AboutPage/>
        },{
          path : 'contact',
          element : <ContactPage/>
        },
        {
          path : '/venues/:location?',
          element : <AllVenues/>
        },{
          path : 'venues/box/',
          element : <Breadcrumb />
        },{
          path : 'venues/box/:id',
          element : <BoxInfo/>
        }
      ]
    },
      // {
      //   path: '/',
      //   element: <div >
      //   <Navbar  />
      //   <Hero/>
      //   <Footer />
      // </div>
      // },{
      //   path: '/about',
      //   element : <div>
      //     <Navbar />
      //     <AboutPage />
      //     <Footer />
      //   </div>
      // },
      // {
      //   path: '/venues/:location?',
      //   element: <div>
      //     <Navbar  />
      //     <AllVenues />
      //   </div>
      // },
      // {
      //   path:'/venues/box/',
      //   children : [
      //     {
      //       path : '',
      //       element:<div>
      //         <Navbar  />
      //         <Breadcrumb/>
      //       </div>
      //     },
      //     {
      //       path : ':id',
      //       element:<div>
      //         <Navbar  />
      //         <BoxInfo/>
      //       </div>
      //     }
      //   ]
      // }

    ]
  )
  return (<>
      <Analytics />
     <RouterProvider router={router} />
    </>
  )
}

export default App
