import React, { useState } from 'react';
import { Camera } from 'lucide-react';

function ScanLeavePass() {
  const [scannedNumber, setScannedNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async (file) => {
    try {
      setIsLoading(true);
      // Here you would typically:
      // 1. Send the image to your backend
      // 2. Process the image to get the number
      // 3. Verify the number against approved leaves
      
      // Simulating API call
      setTimeout(() => {
        // Mock verification result
        setVerificationResult({
          allowed: Math.random() > 0.5,
          message: Math.random() > 0.5 
            ? "Leave pass verified successfully" 
            : "No matching leave pass found"
        });
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error scanning leave pass:', error);
      setVerificationResult({
        allowed: false,
        message: "Error processing leave pass"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Scan Leave Pass</h1>
      
      <div className="max-w-md mx-auto">
        {/* Camera/Upload Interface */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => handleScan(e.target.files[0])}
            className="hidden"
            id="camera-input"
          />
          <label
            htmlFor="camera-input"
            className="cursor-pointer flex flex-col items-center"
          >
            <Camera className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-gray-600">Click to scan leave pass</span>
          </label>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Processing...</p>
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && !isLoading && (
          <div className={`mt-4 p-4 rounded-lg ${
            verificationResult.allowed 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            <p className="font-semibold">
              {verificationResult.allowed ? 'ALLOWED' : 'NOT ALLOWED'}
            </p>
            <p className="text-sm mt-1">
              {verificationResult.message}
            </p>
          </div>
        )}

        {/* Recent Scans */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Scans</h2>
          <div className="space-y-2">
            {/* You can map through recent scans here */}
            <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              No recent scans
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanLeavePass; 