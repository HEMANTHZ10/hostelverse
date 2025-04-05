import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Building2 className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          HostelVerse
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A comprehensive hostel management system for modern institutions.
          Streamline operations, enhance student experience, and manage resources efficiently.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default LandingPage; 