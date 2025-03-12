import React, {useContext} from "react";
import { MapPin, Eye } from "lucide-react";
import { Link, Route, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import AuthPopup from "../Logins/AuthPopup";

const TurfCard = ({ venue }) => {
  const {token} = useContext(StoreContext);
  const navigate = useNavigate();
  const { setisOpen} = useContext(StoreContext);

  const bookingHandler = () => {
    if (token) {
      // Redirect to booking page
    window.open('https://bookyourbox.in/5098-2/', "_self");
  }
  else {
    // Redirect to login page
    setisOpen(true);
    }
  }
  return (
    <div className="bg-white shadow-emerald-300 shadow-sm rounded-2xl p-6 relative flex max-sm:flex-col justify-between">
        <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-4">{venue.name}</h2>
            <div className="flex items-center text-gray-600 mt-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm sm:text-[text-]">{venue.location}</span>
            </div>
            

            
            <button onClick={()=>{bookingHandler()}} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold
            py-2 px-4 rounded w-fit mt-1">Book Now</button>
        </div>
      
      <div className="mt-4 flex flex-col  text-red-600 font-bold max-sm:text-sm text-lg">
        <div className="mr-4">Morning: ₹ {venue.morningPrice}/hr</div>
        <div>Night: ₹ {venue.nightPrice}/hr</div>
      </div>
        <div>
            


        </div>
      

        
    </div>

  );
};

export default TurfCard;
