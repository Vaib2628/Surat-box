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

import { Helmet } from 'react-helmet'
import HomePageSchema from './Components/SchemaMarkup/HomePageSchema'
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
    },{
      path : '/admin',
      element : <AdminDashboard />
    }, {
      path : '/bookings/:turfId',
      element : <TurfBooking />
    }
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
  <Helmet >
    <meta name="google-site-verification" content="7YKs64rkVo3vHK87Pct_P8ez4sJ1q3Jsy0W1Il_DT2I" />
    <title>Box Cricket in Surat | Book Your Turf Online - BookYourBox</title>
    <meta name="description" content="Looking for the best box cricket turf in Surat? Book your slot online easily with BookYourBox. Enjoy hassle-free booking and competitive pricing!" />


  </Helmet>
    <HomePageSchema/>
      <Analytics />
     <RouterProvider router={router} />

    </>
  )
}

export default App
