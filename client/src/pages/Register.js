import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add your registration logic here
      // For example: await registerUser(formData);
      
      // Show success message
      alert('Registration successful! Redirecting to login...');
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      // Handle registration errors
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            required
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            required
          />
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            required
          />
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            required
          />
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
          <div className="text-center text-gray-600">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register; 