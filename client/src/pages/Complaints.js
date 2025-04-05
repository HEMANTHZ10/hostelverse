import React from 'react';
import { AlertCircle, CheckCircle, Clock, PenTool as Tool } from 'lucide-react';

function Complaints() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Complaints & Maintenance</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold">New</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-gray-600">Complaints</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-lg font-semibold">In Progress</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-gray-600">Being addressed</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold">Resolved</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">45</p>
          <p className="text-gray-600">This month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Tool className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold">Maintenance</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
          <p className="text-gray-600">Scheduled</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Submit New Complaint</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Electrical</option>
                <option>Plumbing</option>
                <option>Furniture</option>
                <option>Cleanliness</option>
                <option>Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Please describe the issue in detail..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Complaint
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
          <div className="space-y-4">
            {[
              {
                category: 'Electrical',
                description: 'Fan not working in room A-203',
                status: 'In Progress',
                priority: 'High',
                date: '2024-03-01',
                statusColor: 'text-yellow-600'
              },
              {
                category: 'Plumbing',
                description: 'Water leakage in bathroom',
                status: 'Resolved',
                priority: 'Urgent',
                date: '2024-02-28',
                statusColor: 'text-green-600'
              },
              {
                category: 'Furniture',
                description: 'Broken chair needs replacement',
                status: 'New',
                priority: 'Low',
                date: '2024-02-27',
                statusColor: 'text-red-600'
              }
            ].map((complaint, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{complaint.category}</h3>
                    <p className="text-sm text-gray-600">{complaint.description}</p>
                  </div>
                  <span className={`font-semibold ${complaint.statusColor}`}>
                    {complaint.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Priority: {complaint.priority}</span>
                  <span>{complaint.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;