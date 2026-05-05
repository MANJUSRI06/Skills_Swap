import React from 'react';

const LoadingSpinner = ({ message = 'Skill Swap AI loading...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-brand-offwhite dark:bg-gray-900 z-50 transition-colors duration-300">
      <div className="relative">
        {/* Animated Rings */}
        <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-24 h-24 border-4 border-purple-500/10 border-b-purple-500 rounded-full animate-spin-slow"></div>
        
        {/* Central Glowing Icon */}
        <div className="absolute inset-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/40 flex items-center justify-center animate-pulse">
           <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-shimmer">
          {message}
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">
          Waking up our AI engines...
        </p>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
