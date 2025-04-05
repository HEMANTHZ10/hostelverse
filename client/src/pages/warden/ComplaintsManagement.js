import React, { useState } from 'react';
import { MessageSquare, Search, Filter, CheckCircle2, XCircle, Clock, MoreVertical, Eye, RefreshCw, X } from 'lucide-react';

function ComplaintsManagement() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Mock data - Replace with actual API data
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      room: 'A-101',
      title: 'Water Leakage in Bathroom',
      description: 'There is a continuous water leakage in the bathroom of room A-101. It has been causing inconvenience for the past 2 days.',
      date: '2024-04-05',
      status: 'pending',
      priority: 'high',
      contactNo: '9876543210',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      room: 'B-203',
      title: 'WiFi Connectivity Issues',
      description: 'The WiFi connection in my room is very weak. Unable to attend online classes properly.',
      date: '2024-04-04',
      status: 'in-progress',
      priority: 'medium',
      contactNo: '9876543211',
      email: 'jane.smith@example.com'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      room: 'C-305',
      title: 'Broken Window',
      description: 'The window in my room is broken and needs immediate repair as it is causing security concerns.',
      date: '2024-04-03',
      status: 'resolved',
      priority: 'high',
      contactNo: '9876543212',
      email: 'mike.johnson@example.com'
    },
    {
      id: 4,
      studentName: 'Sarah Williams',
      room: 'D-102',
      title: 'Room Cleaning Request',
      description: 'Requesting a thorough cleaning of my room as it hasn\'t been cleaned properly for a week.',
      date: '2024-04-02',
      status: 'pending',
      priority: 'low',
      contactNo: '9876543213',
      email: 'sarah.williams@example.com'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-600';
      case 'in-progress': return 'bg-blue-50 text-blue-600';
      case 'resolved': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-600';
      case 'medium': return 'bg-yellow-50 text-yellow-600';
      case 'low': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const handleActionClick = (complaint, action) => {
    setSelectedComplaint(complaint);
    setActiveDropdown(null);
    
    switch (action) {
      case 'view':
        setShowDetailsModal(true);
        break;
      case 'update':
        setNewStatus(complaint.status);
        setShowStatusModal(true);
        break;
      default:
        break;
    }
  };

  const handleStatusUpdate = () => {
    if (selectedComplaint && newStatus) {
      setComplaints(complaints.map(complaint => 
        complaint.id === selectedComplaint.id 
          ? { ...complaint, status: newStatus }
          : complaint
      ));
      setShowStatusModal(false);
      setSelectedComplaint(null);
      setNewStatus('');
    }
  };

  const filteredComplaints = selectedFilter === 'all' 
    ? complaints 
    : complaints.filter(complaint => complaint.status === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complaints Management</h1>
            <p className="mt-2 text-gray-600">Manage and resolve student complaints efficiently</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
            <div key={complaint.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <p className="text-gray-600">{complaint.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{complaint.studentName}</span>
                      <span>•</span>
                      <span>Room {complaint.room}</span>
                      <span>•</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(complaint.status)}`}>
                      {getStatusIcon(complaint.status)}
                      {complaint.status}
                    </span>
                    <div className="relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === complaint.id ? null : complaint.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      {activeDropdown === complaint.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                          <button
                            onClick={() => handleActionClick(complaint, 'view')}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleActionClick(complaint, 'update')}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Update Status
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Update Modal */}
        {showStatusModal && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Update Complaint Status</h3>
                <button onClick={() => setShowStatusModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Complaint Details</h3>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Title</h4>
                  <p className="text-gray-900">{selectedComplaint.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <p className="text-gray-900">{selectedComplaint.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Student Name</h4>
                    <p className="text-gray-900">{selectedComplaint.studentName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Room Number</h4>
                    <p className="text-gray-900">{selectedComplaint.room}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact Number</h4>
                    <p className="text-gray-900">{selectedComplaint.contactNo}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="text-gray-900">{selectedComplaint.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedComplaint.status)}`}>
                      {selectedComplaint.status}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Submitted On</h4>
                  <p className="text-gray-900">{selectedComplaint.date}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintsManagement; 