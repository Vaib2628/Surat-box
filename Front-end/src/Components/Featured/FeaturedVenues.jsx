import React, { useEffect, useState } from 'react'
import { VenuesList } from '../../assets/Assets';
import { ArrowRight} from 'lucide-react';
import VenueGallery from './VenueGallery';
import Card from './Card';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';

const FeaturedVenues = () => {
  const [featuredVenues, setFeaturedVenues] = useState([]);
  useEffect(()=>{
    setFeaturedVenues(...[VenuesList.filter(venue => venue.isFeatured === true)]);
    
  }, [])
  return (
    <div>
      <div className="w-full xs:w-[85%] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex max-sm:flex-col justify-center items-center mb-8 relative">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Venues</h2>
          <Link to={'/venues'}><button className="flex items-center text-emerald-400 hover:text-emerald-300 sm:absolute sm:right-0 sm:top-3">
            View all <ArrowRight className="w-4 h-4 ml-2" />
          </button></Link>
        </div>
        <ScrollAnimation animateIn="fadeIn" animateOnce={true} duration={0.4}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredVenues.map(venue => (
            <Card venue={venue} key={venue.id}/>
          ))}
        </div>
        </ScrollAnimation>
      </div> 
    </div>
  )
}

export default FeaturedVenues
