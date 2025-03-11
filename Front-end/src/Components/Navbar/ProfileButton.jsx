import { useState, useContext, useEffect } from "react";
import { LogOut, CircleUserRound } from "lucide-react";
import {jwtDecode} from "jwt-decode";
import { StoreContext } from "../Context/StoreContext";

const ProfileButton = ({setisOpen}) => {
  const [selectedProf, setSelectedProf] = useState(false);
  const { token, logout } = useContext(StoreContext);
  

  

  return (
    <>
      {!token ? (
        <button
          className="text-gray-600 hover:text-emerald-600 transition-colors"
          onClick={() => setisOpen(true)}
        >
          Login
        </button>
      ) : (
        <div className=" relative top-5">
          {/* Profile Icon with Initials */}
          <div
            className=" w-10 h-10 text-white flex items-center justify-center 
            rounded-full font-bold cursor-pointer select-none transition-all duration-300"
            onClick={() => setSelectedProf((prev) => !prev)}
          >
           <CircleUserRound className="text-emerald-700" size={33}/>
          </div>

          <div
            className={`bg-white shadow-lg rounded-lg p-2 
            flex items-center gap-2 cursor-pointer transition-all duration-300 transform ${
              selectedProf ? "opacity-100" : "opacity-0 scale-95 "
            }`  }
            onClick={()=>logout()} 
          >
            <LogOut className="text-red-500" />
            <span className="text-gray-700" >Logout</span>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
