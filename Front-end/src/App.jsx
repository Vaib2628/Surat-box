import React, {useState, useEffect} from 'react'
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
import ReactGA from 'react-ga4';
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) 
  
  useEffect(() => {
    // Send pageview on route change
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

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
    <Helmet>
        {/* Primary Meta Tags */}
        <title>BookYourBox -Box Cricket Turf Booking in Surat | Online Reservation</title>
        <meta name="title" content="BookYourBox - #1 Box Cricket Turf Booking in Surat | Online Reservation" />
        <meta name="description" content="Book box cricket turfs in Surat instantly with BookYourBox. Best prices, prime locations, and hassle-free online booking system. Reserve your slot now!" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://bookyourbox.vercel.app" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bookyourbox.vercel.app" />
        <meta property="og:title" content="BookYourBox - #1 Box Cricket Turf Booking in Surat | Online Reservation" />
        <meta property="og:description" content="Book box cricket turfs in Surat instantly with BookYourBox. Best prices, prime locations, and hassle-free online booking system. Reserve your slot now!" />
        <meta property="og:image" content="https://bookyourbox.vercel.app/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bookyourbox.vercel.app" />
        <meta property="twitter:title" content="BookYourBox - #1 Box Cricket Turf Booking in Surat | Online Reservation" />
        <meta property="twitter:description" content="Book box cricket turfs in Surat instantly with BookYourBox. Best prices, prime locations, and hassle-free online booking system. Reserve your slot now!" />
        <meta property="twitter:image" content="https://bookyourbox.vercel.app/twitter-image.jpg" />
        
        {/* Additional SEO tags */}
        <meta name="keywords" content="box cricket, cricket turf, Surat, book online, sports booking, cricket booking, indoor cricket" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="BookYourBox" />
      </Helmet>


  </Helmet>
    <HomePageSchema/>
      <Analytics />
     <RouterProvider router={router} />

    </>
  )
}

export default App
