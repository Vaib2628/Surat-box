import React, {useState} from 'react'
import Card from './Card'
import HeaderImg from '../../assets/Images/header.jpg'
import { MapPin, Calendar } from 'lucide-react'
import FeaturedVenues from '../Featured/FeaturedVenues'
const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-emerald-400/20  -z-1000" />
    <div className="max-w-7xl mx-auto">
      <div className="relative">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              Cricket Experience
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Premium grounds. Professional facilities. Unforgettable matches.
          </p>
        </div>
        <Card />
        
      </div>
    </div>
    <FeaturedVenues/>
  </div>
  )
}

export default Hero
