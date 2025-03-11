import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-green-50">
      
      {/* Our Team Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-12">Meet Our Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <img 
              src="/api/placeholder/200/200" 
              alt="Team member" 
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-green-800">Rahul Sharma</h3>
            <p className="text-gray-600">Founder & CEO</p>
            <p className="text-gray-500 mt-2">Former state-level cricket player with a passion for tech</p>
          </div>
          
          <div className="text-center">
            <img 
              src="/api/placeholder/200/200" 
              alt="Team member" 
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-green-800">Priya Patel</h3>
            <p className="text-gray-600">Operations Director</p>
            <p className="text-gray-500 mt-2">Sports management expert with 10+ years experience</p>
          </div>
          
          <div className="text-center">
            <img 
              src="/api/placeholder/200/200" 
              alt="Team member" 
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-green-800">Arun Kumar</h3>
            <p className="text-gray-600">Technology Lead</p>
            <p className="text-gray-500 mt-2">Full-stack developer and cricket enthusiast</p>
          </div>
        </div>
      </div>
      
    
      
      <h2 className="text-3xl font-bold text-center text-green-900 mb-12">About Us</h2>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuXcfwwUX9DkcLi00HnHAyMQY0BrByBiy1trZwS6GeNKFF3T6CWDsrJNVaYLrv7M-32d3f&s" 
                alt="Cricket turf" 
                className="rounded-lg w-full"
              />
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-green-800 mb-4">BookYourBox</h2>
              <p className="text-gray-700 mb-4">
                CricketSpot provides a simple and efficient way to book cricket turfs for matches and practice sessions. 
                Founded in 2023, we connect players with quality cricket facilities across the country.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Instant Booking</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Quality Facilities</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Flexible Timing</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        </div>
  );
};

export default AboutPage;