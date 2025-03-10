import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TurfBooking = () => {
  const { turfId } = useParams(); // Get turf ID from URL
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
  });
  
  // Slots state
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  
  // Booking state
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  
  // Fetch turf details on component mount
  useEffect(() => {
    const fetchTurfDetails = async () => {
      try {
        const response =  await axios.get(`http://localhost:5000/api/turfs/${turfId}`);

        setTurf(response.data.turf);
        setLoading(false);
      } catch (err) {
        setError('Failed to load turf details');
        setLoading(false);
      }
    };
    
    fetchTurfDetails();
  }, [turfId]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // If date changed, fetch available slots
    if (name === 'date') {
      fetchAvailableSlots(value);
    }
  };
  
  // Fetch available slots for selected date
  const fetchAvailableSlots = async (date) => {
    setLoadingSlots(true);
    setSelectedSlot(null);
    
    try {
      const response = await axios.get(`/api/turfs/${turfId}/slots`, {
        params: { date }
      });
      setSlots(response.data.slots);
      setLoadingSlots(false);
    } catch (err) {
      setLoadingSlots(false);
      setError('Failed to load available slots');
    }
  };
  
  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };
  
  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedSlot) {
      setBookingError('Please select a time slot');
      return;
    }
    
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      
      const response = await axios.post('/api/bookings', {
        turfId,
        slotId: selectedSlot._id,
        bookingDate: formData.date
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setBookingSuccess(true);
      setBookingError(null);
      // Reset form and selected slot
      setSelectedSlot(null);
      setSlots(slots.filter(slot => slot._id !== selectedSlot._id));
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Failed to book slot');
    }
  };
  
  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 text-center p-6">{error}</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Book {turf?.name}</h1>
      
      {bookingSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Booking successful! You can view your bookings in your profile.
        </div>
      )}
      
      {bookingError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {bookingError}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Turf Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-medium">Location:</span> {turf?.location}</p>
            <p><span className="font-medium">Price:</span> ₹{turf?.pricePerHour}/hour</p>
          </div>
          <div>
            <p><span className="font-medium">Facilities:</span> {turf?.facilities?.join(', ')}</p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Book Now</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Available Slots</h3>
          
          {loadingSlots ? (
            <p>Loading slots...</p>
          ) : slots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slots.map((slot) => (
                <div
                  key={slot._id}
                  onClick={() => handleSlotSelect(slot)}
                  className={`p-3 border rounded text-center cursor-pointer ${
                    selectedSlot?._id === slot._id 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No slots available for selected date. Please try another date.</p>
          )}
        </div>
        
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded focus:outline-none"
            disabled={!selectedSlot}
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default TurfBooking;
