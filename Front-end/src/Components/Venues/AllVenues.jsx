import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { VenuesList } from '../../assets/Assets'
import { ArrowRight } from 'lucide-react';
import Card from '../Featured/Card';
import LocationFilter from './LocationFilter';
import { locationList } from '../../assets/Assets';
import { Helmet } from 'react-helmet';
const AllVenues = () => {
  const {location} = useParams();

  const [isloading, setisloading] = useState(true);
  const [filteredVenues , setfilteredVenues] = useState([]);
  useEffect(()=>{
    setfilteredVenues(VenuesList.filter((venue) => {
    return !location || venue.area === location;
  }) )
  setisloading(false);
  }, [location])
  ;

  return (
    <div>
      <Helmet>
      <title>Cricket Grounds in Surat | Book Cricket Box Online | BookYourBox</title>
      <title>Cricket Turf Booking Surat | Same-Day Cricket Box Reservations</title>
      <meta name="description" content="Discover 20+ cricket grounds across Surat. Filter by location, facilities, and price. Book your preferred cricket box instantly with no booking fees." />

      <meta name="description" content="Find and book the best cricket turfs in Surat. Real-time availability, secure payment, and instant confirmations. Perfect for matches and practice sessions." />
      </Helmet>
      <div className="w-full xs:w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <LocationFilter locations={locationList}/>
        {isloading ? <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div> : <>
        {filteredVenues.length > 0 ? (<>
          <div className="flex max-sm:flex-col justify-center items-center mb-8 relative">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Venues</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
              <Card key={venue.id} venue={venue} />
            ))}
          </div>
          
          </>
        ) : (
          <div className="flex justify-center items-center">
            <div className='text-center text-orange-700 text-2xl font-mono h-full'>Currently there are no venues to display on this location</div>
          </div>
        )}
        </>
          }
          


        
      </div>
    </div>
  )
}

export default AllVenues
