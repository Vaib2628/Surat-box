import React, { useContext, useEffect, useState } from "react";
import { CircleUserRound, LogOut, Menu } from "lucide-react";
import MobileNav from "./MobileNav";
import { Link, Route } from "react-router-dom";
import AuthPopup from "../Logins/AuthPopup";
import { StoreContext } from "../Context/StoreContext";
import ProfileButton from "./ProfileButton";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isOpen, setisOpen} = useContext(StoreContext);
  const [onClose, setonClose] = useState(false)
  // const [login , setLogin] = useState(localStorage.getItem('token') || null)
  const {token, logout} = useContext(StoreContext);
  const [login, setLogin] = useState('')

  useEffect(()=>{
    setLogin(token);
  },[token])
  //to toggle logout button
  const [selectedProf, setSelectedProf] = useState(false);

  return (<>
    {isOpen && (<AuthPopup isOpen={isOpen} setisOpen={setisOpen} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>)}


    <nav className="w-full z-50 bg-white/70 backdrop-blur-lg border-b border-emerald-100">
      <div className={`max-w-7xl mx-auto px-4 ${isMenuOpen && "hidden"}`}>
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              <Link to={'/'}>BookYourBox</Link>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="max-md:hidden md:flex items-center place-items-start space-x-8 transition-all duration-1000 ease-in ">
            <Link to={'/about'}><span href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              About
            </span></Link>
            <Link to={'/venues'}><span className="text-gray-600 hover:text-emerald-600 transition-colors">
              Venues
            </span></Link>
            <Link to={'/contact'}><span href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Contact
            </span></Link>
            
            {/* {!login ? <button className="text-gray-600 hover:text-emerald-600 transition-colors"
            onClick={()=>setisOpen(true)}
            >
              Login
            </button> : <div className={selectedProf ? 'relative top-6' :'relative w-10'}>
              <div onClick={()=>setSelectedProf((prev)=>!prev)}  className="cursor-pointer"><CircleUserRound /></div>
              {selectedProf && <div>
                <div></div>
                <div onClick={()=>logout()} className="cursor-pointer bg-white shadow-lg rounded-lg p-2 gap-1.5 flex ">
                  <LogOut />logout
                </div>
              
              </div>}

              </div>} */}
              <ProfileButton setisOpen={setisOpen}/>
            <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-2.5 rounded-full hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <Menu /> 
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <MobileNav setIsMenuOpen={setIsMenuOpen} setisOpen={setisOpen}/>}
    </nav></>
  );
};

export default Navbar;
