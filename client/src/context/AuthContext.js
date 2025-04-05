import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Sample user credentials - you can move this to a separate config file later
export const SAMPLE_USERS = [
  { 
    email: 'student@hostel.com', 
    password: 'student123', 
    name: 'John Student',
    role: 'student'
  },
  { 
    email: 'admin@hostel.com', 
    password: 'admin123', 
    name: 'Admin User',
    role: 'admin'
  },
  { 
    email: 'warden@hostel.com', 
    password: 'warden123', 
    name: 'Hostel Warden',
    role: 'warden'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    // You could also store in localStorage here if you want persistence
  };

  const logout = () => {
    setUser(null);
    // Clear localStorage if you're using it
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 