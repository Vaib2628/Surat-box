import React from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../Navbar/Breadcrumb';
import VenueGallery from '../Featured/VenueGallery';
import featuredVenues from '../../assets/Assets';
import TurfCard from './Turfcard';
import TurfAmen from './TurfAmen';
import TurfLoc from './TurfLoc';
import Footer from './../Footer/Footer'
const BoxInfo = () => {
    const { id } = useParams(); 
    
    const venue = featuredVenues.find((venue) => venue.id === parseInt(id));
  return (
    <div className=''>
        <Breadcrumb />
        <div className="p-6 pt-5 inset-0 bg-gradient-to-br from-emerald-600/20 to-emerald-400/20 ">
            <div className='w-[95%] xs:w-[90%] sm:w-[80%] mx-auto'>
                <VenueGallery images={venue.images} venueName={venue.name} height={true}/>
                <hr className="w-full h-0.5 my-5" />
                <TurfCard venue={venue}/>

                <TurfAmen venue={venue}/>
                <TurfLoc venue={venue}/>

            </div>
        </div>
        <Footer />
    </div>
  )
}

export default BoxInfo
