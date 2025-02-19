import React, { useState } from "react";
import { Menu } from "lucide-react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full z-50 bg-white/70 backdrop-blur-lg border-b border-emerald-100">
      <div className={`max-w-7xl mx-auto px-4 ${isMenuOpen && "hidden"}`}>
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
              Cricketify
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="max-md:hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Venues
            </a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Contact
            </a>
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
      {isMenuOpen && <MobileNav setIsMenuOpen={setIsMenuOpen} />}
    </nav>
  );
};

export default Navbar;
