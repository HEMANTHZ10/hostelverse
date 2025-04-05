import React, { useState } from 'react';
import { Users, CheckCircle2, XCircle, Calendar } from 'lucide-react';

function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Mock data - Replace with actual API data
  const attendanceData = {
    totalStudents: 150,
    present: 120,
    absent: 20,
    onLeave: 10
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="mt-2 text-gray-600">Monitor and manage student attendance records</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-700"
            />
          </div>
        </div>

        {/* Statistics Cards - Vertical Layout */}
        <div className="space-y-6">
          {/* Total Students Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{attendanceData.totalStudents}</p>
                  </div>
                </div>
                <div className="w-48">
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-blue-600 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Present Students Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Present</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{attendanceData.present}</p>
                  </div>
                </div>
                <div className="w-48">
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-2 bg-green-600 rounded-full" 
                      style={{ width: `${(attendanceData.present / attendanceData.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Absent Students Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-50 rounded-full">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Absent</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{attendanceData.absent}</p>
                  </div>
                </div>
                <div className="w-48">
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-2 bg-red-600 rounded-full" 
                      style={{ width: `${(attendanceData.absent / attendanceData.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* On Leave Card */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-50 rounded-full">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">On Leave</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{attendanceData.onLeave}</p>
                  </div>
                </div>
                <div className="w-48">
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-2 bg-yellow-600 rounded-full" 
                      style={{ width: `${(attendanceData.onLeave / attendanceData.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceManagement; 