import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <div className="bg-green-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Get In Touch</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Have questions about our services or want to partner with us? We'd love to hear from you!
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow text-center flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-lg font-semibold text-green-800 mb-1">Phone</h3>
              <p className="text-gray-600">+91 9316726049</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-green-800 mb-1">Email</h3>
              <p className="text-gray-600">bookyourbox2025@gmail.com</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-green-800 mb-1">Location</h3>
              <p className="text-gray-600">L-102 Anjani residency jahangirpura, surat</p>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  )
}

export default ContactPage
