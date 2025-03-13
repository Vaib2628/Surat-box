import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, ChevronDown, Edit, Trash2, Plus, User, DollarSign, Calendar as CalendarIcon, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [myTurfs, setMyTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [isAddTurfModalOpen, setIsAddTurfModalOpen] = useState(false);
  const [isAddSlotModalOpen, setIsAddSlotModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5000';

  const fetchData = async (endpoint, method = 'GET', body = null) => {
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${endpoint}`,
        data: body,
        headers: { 'Content-Type': 'application/json',
          Authorization : 'Bearer ' + localStorage.getItem('token')
         },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return { success: false, message: error.message };
    }
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const dashboardResponse = await fetchData('/api/admin/dashboard');
        if (dashboardResponse.success) setDashboardStats(dashboardResponse.stats);

        const turfsResponse = await fetchData('/api/turfs/admin/my-turfs');
        if (turfsResponse.success) setMyTurfs(turfsResponse.turfs);

        const bookingsResponse = await fetchData('/api/admin/my-bookings');
        if (bookingsResponse.success) setBookings(bookingsResponse.bookings);

        const usersResponse = await fetchData('/api/admin/users');
        if (usersResponse.success) setUsers(usersResponse.users);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleUpdateBookingStatus = async (bookingId, status) => {
    const response = await fetchData(`/api/admin/bookings/${bookingId}/status`, 'PUT', { status });
    if (response.success) {
      setBookings(bookings.map(booking => (booking._id === bookingId ? { ...booking, status } : booking)));
    }
  };

  const handleDeleteTurf = async (turfId) => {
    const response = await fetchData(`/api/turfs/${turfId}`, 'DELETE');
    if (response.success) {
      setMyTurfs(myTurfs.filter(turf => turf._id !== turfId));
    }
  };

  const handleToggleTurfStatus = async (turfId) => {
    const turf = myTurfs.find(t => t._id === turfId);
    const response = await fetchData(`/api/turfs/${turfId}/status`, 'PUT', { isActive: !turf.isActive });
    if (response.success) {
      setMyTurfs(myTurfs.map(t => (t._id === turfId ? { ...t, isActive: !t.isActive } : t)));
    }
  };

  // Format date and time for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get status color class
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Dashboard tab content
  const renderDashboard = () => (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : dashboardStats ? (
        <>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Turfs</p>
                <p className="text-2xl font-bold">{dashboardStats.turfCount}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">₹{dashboardStats.totalRevenue}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Confirmed Bookings</p>
                <p className="text-2xl font-bold">{dashboardStats.bookingStats.confirmed}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Bookings</p>
                <p className="text-2xl font-bold">{dashboardStats.bookingStats.pending}</p>
              </div>
            </div>
          </div>
          
          {/* Today's bookings */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Today's Bookings</h3>
            </div>
            <div className="p-4">
              {dashboardStats.todayBookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turf</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardStats.todayBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{booking.user.name}</div>
                            <div className="text-gray-500 text-sm">{booking.user.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{booking.turf.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{formatTime(booking.slot.startTime)} - {formatTime(booking.slot.endTime)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">₹{booking.amount}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">No bookings scheduled for today</div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">Failed to load dashboard data</div>
      )}
    </div>
  );

  // My Turfs tab content
  const renderMyTurfs = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Cricket Turfs</h2>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setIsAddTurfModalOpen(true)}
        >
          <Plus size={16} className="mr-1" />
          Add New Turf
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : myTurfs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myTurfs.map((turf) => (
            <div key={turf._id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img 
                  src={`/api/placeholder/400/300`} 
                  alt={turf.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{turf.name}</h3>
                    <p className="text-gray-500">{turf.location}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${turf.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {turf.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 line-clamp-2">{turf.description}</p>
                <div className="mt-3">
                  <div className="text-gray-900 font-semibold">₹{turf.pricePerHour}/hour</div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {turf.facilities.map((facility, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button 
                    className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                    onClick={() => {
                      setSelectedTurf(turf);
                      setIsAddSlotModalOpen(true);
                    }}
                  >
                    <CalendarIcon size={16} className="mr-1" />
                    Add Slots
                  </button>
                  <button 
                    className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                    onClick={() => handleToggleTurfStatus(turf._id)}
                  >
                    {turf.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
                <div className="mt-2 flex space-x-2">
                  <button className="flex-1 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center">
                    <Edit size={16} className="mr-1" />
                    Edit
                  </button>
                  <button 
                    className="flex-1 bg-red-50 text-red-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center"
                    onClick={() => handleDeleteTurf(turf._id)}
                  >
                    <Trash2 size={16} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No turfs found</h3>
          <p className="mt-2 text-gray-500">Get started by adding your first cricket turf.</p>
          <button 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md inline-flex items-center"
            onClick={() => setIsAddTurfModalOpen(true)}
          >
            <Plus size={16} className="mr-1" />
            Add New Turf
          </button>
        </div>
      )}
    </div>
  );

  // Bookings tab content
  const renderBookings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Bookings</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : bookings.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turf</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking._id.substring(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.user.name}</div>
                      <div className="text-sm text-gray-500">{booking.user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{booking.turf.name}</div>
                      <div className="text-sm text-gray-500">{booking.turf.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(booking.bookingDate)}</div>
                      <div className="text-sm text-gray-500">
                        {formatTime(booking.slot.startTime)} - {formatTime(booking.slot.endTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{booking.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {booking.status !== 'cancelled' && (
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
                            Actions <ChevronDown size={14} className="inline ml-1" />
                          </button>
                          <div className="hidden group-hover:block absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {booking.status === 'pending' && (
                                <button 
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                                >
                                  Confirm Booking
                                </button>
                              )}
                              {booking.status !== 'cancelled' && (
                                <button 
                                  className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                  onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                                >
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
          <p className="mt-2 text-gray-500">Bookings will appear here once users start making reservations.</p>
        </div>
      )}
    </div>
  );

  // Users tab content
  const renderUsers = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Management</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : users.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={20} className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">No users found</h3>
          <p className="mt-2 text-gray-500">Users will appear here once they register in your application.</p>
        </div>
      )}
    </div>
  );

  // Add Turf
  // Add Turf Modal
const renderAddTurfModal = () => (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${isAddTurfModalOpen ? 'flex' : 'hidden'} items-center justify-center`}>
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Add New Cricket Turf</h3>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={() => setIsAddTurfModalOpen(false)}
          >
            <XCircle size={24} />
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="turf-name" className="block text-sm font-medium text-gray-700">Turf Name</label>
              <input
                type="text"
                id="turf-name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter turf name"
              />
            </div>
            
            <div>
              <label htmlFor="turf-location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="turf-location"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter location"
              />
            </div>
            
            <div>
              <label htmlFor="turf-description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="turf-description"
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter turf description"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="turf-price" className="block text-sm font-medium text-gray-700">Price per Hour (₹)</label>
              <input
                type="number"
                id="turf-price"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter hourly rate"
              />
            </div>
            
            <div>
              <label htmlFor="turf-facilities" className="block text-sm font-medium text-gray-700">Facilities</label>
              <input
                type="text"
                id="turf-facilities"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter facilities (comma separated)"
              />
              <p className="mt-1 text-xs text-gray-500">Example: Floodlights, Changing Rooms, Parking</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-2 border-dashed border-gray-300 w-full h-32 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <div className="flex flex-auto mx-auto">
                      <Plus size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500">Upload turf images</p>
                  </div>
                  <input type="file" className="hidden" multiple />
                </label>
              </div>
            </div>
            
            <div className="flex items-center">
              <input id="turf-status" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="turf-status" className="ml-2 block text-sm text-gray-900">Active (available for booking)</label>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button 
                type="button" 
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
                onClick={() => setIsAddTurfModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  // Add turf logic would go here
                  setIsAddTurfModalOpen(false);
                }}
              >
                Save Turf
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
  // Add Slot Modal
  const renderAddSlotModal = () => (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${isAddSlotModalOpen ? 'flex' : 'hidden'} items-center justify-center`}>
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Add Slots for {selectedTurf?.name || ''}
          </h3>
          <button 
            className="text-gray-400 hover:text-gray-500"
            onClick={() => setIsAddSlotModalOpen(false)}
          >
            <XCircle size={24} />
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="slot-date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="slot-date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  id="start-time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  id="end-time"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input id="recurring" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="recurring" className="ml-2 block text-sm text-gray-900">Make this a recurring slot</label>
            </div>
            
            <div className="hidden">
              <label className="block text-sm font-medium text-gray-700 mb-2">Repeat on days</label>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <label key={day} className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2 text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button 
                type="button" 
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md"
                onClick={() => setIsAddSlotModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  // Add slot logic would go here
                  setIsAddSlotModalOpen(false);
                }}
              >
                Add Slot
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
  // Render active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'turfs':
        return renderMyTurfs();
      case 'bookings':
        return renderBookings();
      case 'users':
        return renderUsers();
      default:
        return renderDashboard();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Sidebar */}
      <div className="flex h-screen">
        <div className="w-64 bg-blue-800 text-white flex flex-col">
          <div className="p-4 border-b border-blue-700">
            <h1 className="text-xl font-bold">Cricket Turf Admin</h1>
          </div>
          <nav className="flex-1 pt-4">
            <ul>
              <li>
                <button 
                  className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'dashboard' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <div className="mr-3">
                    <Calendar size={20} />
                  </div>
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'turfs' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
                  onClick={() => setActiveTab('turfs')}
                >
                  <div className="mr-3">
                    <Calendar size={20} />
                  </div>
                  My Turfs
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'bookings' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <div className="mr-3">
                    <Calendar size={20} />
                  </div>
                  Bookings
                </button>
              </li>
              <li>
                <button 
                  className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'users' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
                  onClick={() => setActiveTab('users')}
                >
                  <div className="mr-3">
                    <User size={20} />
                  </div>
                  Users
                </button>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-blue-700 mt-auto">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <div className="ml-3">
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-blue-300">admin@cricketturf.com</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 pb-16">
            {renderTabContent()}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {renderAddTurfModal()}
      {renderAddSlotModal()}
    </div>
  );
  };
  
  export default AdminDashboard;