import React from 'react'
import { Facebook, Twitter , Instagram } from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                title: "Company",
                links: ["About", "Careers", "Press"]
              },
              {
                title: "Resources",
                links: ["Blog", "Newsletter", "Help Center"]
              },
              {
                title: "Legal",
                links: ["Terms", "Privacy", "Cookies"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
  )
}

export default Footer
