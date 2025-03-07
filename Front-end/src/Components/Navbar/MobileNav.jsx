import { Link, X } from "lucide-react";
import React, { useEffect } from "react";

const MobileNav = ({ setIsMenuOpen }) => {
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative h-screen w-[100vw] bg-white z-[99999] flex flex-col shadow-lg">
      {/* Top Section with Logo & Close Button */}
      <div className="flex justify-between items-center p-6">
        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
          <Link to={'/'}>Cricketify</Link>
        </span>

        {/* Close Button */}
        <button onClick={() => setIsMenuOpen(false)} className="p-2">
          <X size={30} />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-6 px-6 text-lg mt-4">
        <a href="#" className="text-gray-700">Venue</a>
        <a href="#" className="text-gray-700">About Us</a>
        <a href="#" className="text-gray-700">Contact Us</a>

        <button className="px-6 py-3 bg-emerald-800 text-white rounded-lg w-full">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
