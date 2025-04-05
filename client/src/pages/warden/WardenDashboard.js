import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

function WardenDashboard() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Warden Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2>Welcome to Warden Dashboard</h2>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default WardenDashboard; 