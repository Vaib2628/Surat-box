import React from 'react'
import { Facebook, Twitter , Instagram } from 'lucide-react'
import { Link} from "react-router-dom"
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-center justify-items-center text-center">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-4">
                Cricketify
              </h3>
              <p className="text-gray-600">
                Book premium cricket grounds instantly.
              </p>
            </div>
            {[
              {
                title: "Quick Links",
                links: ["About", "Contact", "FAQ's"]
              },
              {
                title: "Legal",
                links: ["Terms Of Service", "Privacy Policy"]
              },
              // {
              //   title: "Follow us",
              //   links: ["Terms", "Privacy", "Cookies"]
              // }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link to={`${link}`}>
                      <span className="text-gray-600 hover:text-emerald-600 transition-colors">
                        {link}
                      </span></Link>
                    </li>
                  ))}
                </ul>
              </div>
              
            ))}
            <div className='social-icons'>
              <h4 className="font-semibold text-gray-900 mb-4">Socials</h4>
              <div className="flex space-x-4">
                <span className="text-gray-600 hover:text-emerald-600 transition-colors">
                  <Facebook size={24} />
                </span>
                <span className="text-gray-600 hover:text-emerald-600 transition-colors">
                  <Twitter size={24} />
                </span>
                <span className="text-gray-600 hover:text-emerald-600 transition-colors">
                  <Instagram size={24} />
                </span>
              </div>
          </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer
