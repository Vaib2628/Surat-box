import React from 'react'
import VenueGallery from './VenueGallery'
import { MapPin, Star } from 'lucide-react'
const Card = ({venue}) => {
  return (
    <div key={venue.id} className="overflow-hidden hover:shadow-xl transition-shadow bg-white border-cyan-400 rounded-lg relative">
              <VenueGallery images={venue.images} venueName={venue.name} />
              <div className="absolute top-4 right-4 bg-emerald-900/90 backdrop-blur px-3 py-1 rounded-full">
                <span className="text-emerald-300 ">{venue.price}/hr</span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{venue.name}</h3>
                <div className="flex items-center text-slate-900 mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-emerald-800" />
                  <span className="text-sm">{venue.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {venue.amenities.map((amenity, i) => (
                    <span key={i} className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-emerald-800 mr-1" />
                    <span className="font-medium text-black">{venue.rating}</span>
                    <span className="text-slate-400 text-sm ml-1">({venue.reviews} reviews)</span>
                  </div>
                  <button className="px-4 py-2 bg-emerald-50 text-emerald-900 rounded-lg hover:bg-emerald-100 transition-colors hover:cursor-pointer">
                    View
                  </button>
                </div>
              </div>
            </div>
  )
}

export default Card
