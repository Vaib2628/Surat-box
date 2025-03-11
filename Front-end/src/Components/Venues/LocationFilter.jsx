import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LocationFilter = ({ locations }) => {
  const { location } = useParams();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(location || '');
  
  useEffect(() => {
    // Update the selected location when URL param changes
    setSelectedLocation(location || '');
  }, [location]);

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);
    
    if (newLocation) {
      // Navigate to the selected location route
      navigate(`/venues/${newLocation}`);
    } else {
      // Navigate to the base venues route (no filter)
      navigate('/venues');
    }
  };

  const clearFilter = () => {
    setSelectedLocation('');
    navigate('/venues');
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="font-medium text-gray-700">Filter by Location</div>
        
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <select 
            value={selectedLocation} 
            onChange={handleLocationChange}
            className="w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 place-self-center"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          
          {selectedLocation && (
            <button 
              onClick={clearFilter}
              className="inline-flex items-center px-3 py-2 text-sm bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200"
            >
              Clear Filter
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;