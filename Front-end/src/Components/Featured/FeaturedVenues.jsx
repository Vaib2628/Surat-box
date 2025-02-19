import React from 'react'
import featuredVenues from '../../assets/Assets'
import { ArrowRight} from 'lucide-react';
import VenueGallery from './VenueGallery';
import Card from './Card';
const FeaturedVenues = () => {
  return (
    <div>
      <div className="w-full xs:w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-black">Featured Venues</h2>
          <button className="flex items-center text-cyan-400 hover:text-cyan-300">
            View all <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVenues.map(venue => (
            <Card venue={venue} key={venue.id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedVenues
