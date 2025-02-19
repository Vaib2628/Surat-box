import React from 'react'
import { Search, MapPin, Calendar, Clock, Star, ArrowRight, Instagram, Facebook, Twitter, ChevronLeft, ChevronRight } from 'lucide-react'
import { locationList } from '../../assets/Assets'
import Asynchronous from './Search'
import { Autocomplete, TextField } from '@mui/material'

const Card = () => {
  return (
    <div className="mt-12 max-w-2xl mx-auto">
    <div className="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Autocomplete
            disablePortal
            options={locationList}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
          
        </div>
        
        <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:cursor-pointer">
          Search Grounds
        </button>
      </div>
    </div>
  </div>
  )
}

export default Card
