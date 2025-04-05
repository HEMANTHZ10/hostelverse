import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Send, Search, Filter, ChevronRight } from 'lucide-react';

function Complaints() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      category: 'Electrical',
      description: 'Fan not working properly in my room',
      status: 'pending',
      date: '2024-03-10',
      response: null
    },
    {
      id: 2,
      category: 'Plumbing',
      description: 'Water leakage in bathroom sink',
      status: 'in-progress',
      date: '2024-03-09',
      response: 'Plumber scheduled for tomorrow'
    },
    {
      id: 3,
      category: 'Furniture',
      description: 'Broken chair needs replacement',
      status: 'resolved',
      date: '2024-03-08',
      response: 'Chair has been replaced'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'resolved':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new complaint object
    const newComplaint = {
      id: Date.now(), // Using timestamp as temporary ID
      category,
      description,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      response: null
    };

    // Add new complaint to the list
    setComplaints(prevComplaints => [newComplaint, ...prevComplaints]);

    // Reset form
    setCategory('');
    setDescription('');

    // Show success message (you can add a toast notification here)
    alert('Complaint submitted successfully!');
  };

  const filteredComplaints = complaints
    .filter(complaint => filterStatus === 'all' || complaint.status === filterStatus)
    .filter(complaint => 
      complaint.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
          <div className="relative p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Complaints & Maintenance
            </h1>
            <p className="text-lg text-gray-600">Submit and track your maintenance requests</p>
          </div>
          <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Submit Complaint Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Submit New Complaint</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                required
              >
                <option value="">Select a category</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Furniture">Furniture</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Please describe the issue in detail..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Send className="w-5 h-5" />
              Submit Complaint
            </button>
          </form>
        </div>

        {/* Complaints List */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Complaints</h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Complaints List */}
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-100 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{complaint.category}</h3>
                      <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                    </div>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                      {getStatusIcon(complaint.status)}
                      {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                    </span>
                  </div>
                  {complaint.response && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-600">{complaint.response}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                    <span>Submitted on {complaint.date}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;