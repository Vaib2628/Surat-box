import React from 'react'
import VenueGallery from './VenueGallery'
import { MapPin, Star } from 'lucide-react'
const Card = ({venue}) => {
  return (
    <div key={venue.id} className="overflow-hidden hover:shadow-xl transition-shadow bg-slate-900 border-cyan-400 rounded-lg">
              <VenueGallery images={venue.images} venueName={venue.name} />
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full shadow-md border border-cyan-400/20">
                <span className="text-cyan-400 font-semibold">{venue.price}/hr</span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">{venue.name}</h3>
                <div className="flex items-center text-slate-300 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{venue.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-cyan-400 mr-1" />
                    <span className="font-medium text-white">{venue.rating}</span>
                    <span className="text-slate-400 text-sm ml-1">({venue.reviews} reviews)</span>
                  </div>
                  <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
  )
}

export default Card
