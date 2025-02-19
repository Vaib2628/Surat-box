import React from "react";
import { MapPin, Eye } from "lucide-react";

const TurfCard = ({ venue }) => {
  return (
    <div className="bg-white shadow-emerald-300 shadow-sm rounded-2xl p-6 relative flex max-sm:flex-col justify-between">
        <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-4">{venue.name}</h2>
            <div className="flex items-center text-gray-600 mt-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm sm:text-[text-]">{venue.location}</span>
            </div>
            <div className="flex items-center text-gray-600 mt-1">
            <Eye className="w-4 h-4 mr-2" />
            <span>{venue.views} Views</span>
            </div>
            <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold
            py-2 px-4 rounded w-fit mt-1">Book Now</button>
        </div>
      
      <div className="mt-4 flex flex-col  text-red-600 font-bold max-sm:text-sm text-lg">
        <div className="mr-4">Morning: ₹ {venue.price}/hr</div>
        <div>Night: ₹ {venue.price}/hr</div>
      </div>
        <div>
            


        </div>
      

        
    </div>

  );
};

export default TurfCard;
