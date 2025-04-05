import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_USERS } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const user = SAMPLE_USERS.find(
        user => user.email === formData.email && user.password === formData.password
      );

      if (user) {
        login({
          name: user.name,
          email: user.email,
          role: user.role
        });
        
        // Redirect based on role
        switch(user.role) {
          case 'student':
            navigate('/student/dashboard');
            break;
          case 'warden':
            navigate('/warden/dashboard');
            break;
          case 'watchman':
            navigate('/watchman/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('Invalid credentials. Please try the sample logins shown below.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login to Your Account</h2>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              id="password"
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
              required
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center
              ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span className="inline-flex items-center">
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </span>
            )}
          </button>
        </form>

        {/* Registration Link Section */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link 
            to="/register" 
            className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Create New Account
          </Link>
        </div>

        {/* Sample Login Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Sample Login Credentials:</h3>
          <div className="space-y-4 text-sm text-gray-600">
            {SAMPLE_USERS.map((user, index) => (
              <div key={user.email} className={index !== 0 ? 'border-t pt-4' : ''}>
                <p><strong>{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Login:</strong></p>
                <p>Email: {user.email}</p>
                <p>Password: {user.password}</p>
                <button 
                  onClick={() => setFormData({ email: user.email, password: user.password })}
                  className="mt-1 text-blue-600 hover:text-blue-700 text-sm underline"
                >
                  Fill credentials
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 