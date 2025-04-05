import React from 'react';
import { Clock, Calendar, UserCheck, UserX } from 'lucide-react';

function Attendance() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Attendance & Leave Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <UserCheck className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold">Present Today</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">85</p>
          <p className="text-gray-600">Students</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <UserX className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold">Absent</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">15</p>
          <p className="text-gray-600">Students</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold">On Leave</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-gray-600">Approved leaves</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-lg font-semibold">Pending</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
          <p className="text-gray-600">Leave requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Medical Leave</option>
                <option>Personal Leave</option>
                <option>Academic Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Leave Request
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Leave History</h2>
          <div className="space-y-4">
            {[
              {
                type: 'Medical Leave',
                from: '2024-03-01',
                to: '2024-03-03',
                status: 'Approved',
                statusColor: 'text-green-600'
              },
              {
                type: 'Personal Leave',
                from: '2024-02-15',
                to: '2024-02-16',
                status: 'Rejected',
                statusColor: 'text-red-600'
              },
              {
                type: 'Academic Leave',
                from: '2024-02-10',
                to: '2024-02-12',
                status: 'Approved',
                statusColor: 'text-green-600'
              }
            ].map((leave, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{leave.type}</h3>
                    <p className="text-sm text-gray-600">
                      {leave.from} to {leave.to}
                    </p>
                  </div>
                  <span className={`font-semibold ${leave.statusColor}`}>
                    {leave.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;