import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RoomBooking from './pages/RoomBooking';
import Attendance from './pages/Attendance';
import Complaints from './pages/Complaints';
import FeePayment from './pages/FeePayment';
import MessMenu from './pages/MessMenu';
import Tracking from './pages/Tracking';
import DashboardLayout from './components/DashboardLayout';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/room-booking" element={
            <ProtectedRoute>
              <RoomBooking />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/attendance" element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/complaints" element={
            <ProtectedRoute>
              <Complaints />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/fee-payment" element={
            <ProtectedRoute>
              <FeePayment />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/mess-menu" element={
            <ProtectedRoute>
              <MessMenu />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/tracking" element={
            <ProtectedRoute>
              <Tracking />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
