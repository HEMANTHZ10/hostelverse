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
    email: 'warden@hostel.com', 
    password: 'warden123', 
    name: 'David Warden',
    role: 'warden'
  },
  { 
    email: 'watchman@hostel.com', 
    password: 'watchman123', 
    name: 'Tom Guard',
    role: 'watchman'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 