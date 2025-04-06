<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

function ComplaintsManagement() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/complaints');
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
      const data = await response.json();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh the complaints list
      await fetchComplaints();
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
=======
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
>>>>>>> 91051d0967f16227f1a5c8a2084b4de3f4728deb
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

<<<<<<< HEAD
=======
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

>>>>>>> 91051d0967f16227f1a5c8a2084b4de3f4728deb
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Complaints</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading complaints...</div>
      ) : (
        <div className="space-y-4">
          {complaints && complaints.length > 0 ? (
            complaints.map(complaint => (
              <div key={complaint._id} className="border p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg">{complaint.title}</h2>
                    <p className="text-gray-600 mt-1">{complaint.description}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Student ID: {complaint.studentId}</p>
                      <p>Date: {new Date(complaint.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No complaints found</p>
          )}
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
export default ComplaintsManagement;
=======
export default ComplaintsManagement;
>>>>>>> 91051d0967f16227f1a5c8a2084b4de3f4728deb
