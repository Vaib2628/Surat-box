import React from 'react'
import { Facebook, Twitter , Instagram } from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white text-center py-12 border-t border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-cyan-400">CricketTurf</h3>
              <p className="text-slate-300">Book premium cricket grounds instantly.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-slate-300 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div className='text-center'>
              <h4 className="text-lg font-semibold mb-4 text-cyan-400">Follow Us</h4>
              <div className="flex space-x-4 justify-center">
                <a href="#" className="text-slate-300 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-slate-300 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-slate-300 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
