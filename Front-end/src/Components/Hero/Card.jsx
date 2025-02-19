import React from 'react'
import { Search, MapPin, Calendar, Clock, Star, ArrowRight, Instagram, Facebook, Twitter, ChevronLeft, ChevronRight } from 'lucide-react'
const Card = () => {
  return (
      <div className="p-2 w-full md:w-1/2 mx-auto bg-slate-900/90 backdrop-blur rounded-lg shadow-lg border-cyan-400/20">
            <div className="flex flex-wrap w-full mx-auto md:flex-nowrap gap-2 flex-col">
                <div className="flex items-center w-full p-2 border-r border-slate-700">
                  <MapPin className="w-5 h-5 text-cyan-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Location" 
                    className="w-full outline-none bg-transparent text-white placeholder-slate-400"
                  />
                </div>
                {/* <div className="flex items-center w-full p-2 border-r border-slate-700">
                  <Calendar className="w-5 h-5 text-cyan-400 mr-2" />
                  <input 
                    type="date" 
                    className="w-full outline-none bg-transparent text-white"
                  />
                </div>
                <div className="flex items-center w-full p-2 border-r border-slate-700">
                  <Clock className="w-5 h-5 text-cyan-400 mr-2" />
                  <input 
                    type="time" 
                    className="w-full outline-none bg-transparent text-white"
                  />
                </div> */}
                <button className="w-full px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                  Search
                </button>
            </div>
        </div>
  )
}

export default Card
