import React from 'react';
import { Building2, Calendar, Users } from 'lucide-react';

function RoomBooking() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Room Booking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Building2 className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold">Available Rooms</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">24</p>
          <p className="text-gray-600">Out of 100 total rooms</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold">Current Bookings</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">76</p>
          <p className="text-gray-600">Active room assignments</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-lg font-semibold">Pending Requests</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-gray-600">Awaiting approval</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Book a Room</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Single Occupancy</option>
              <option>Double Sharing</option>
              <option>Triple Sharing</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (months)</label>
            <input 
              type="number" 
              min="1"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Booking Request
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Current Booking</h2>
        <div className="border rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Room Number</p>
              <p className="font-semibold">A-203</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Room Type</p>
              <p className="font-semibold">Double Sharing</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Check-in Date</p>
              <p className="font-semibold">01/03/2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">6 months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomBooking;