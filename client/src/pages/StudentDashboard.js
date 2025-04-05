import React from 'react';
import { Calendar, Building2, CreditCard, MessageSquare, FileText, Utensils } from 'lucide-react';

function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2>Welcome to Student Dashboard</h2>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard; 