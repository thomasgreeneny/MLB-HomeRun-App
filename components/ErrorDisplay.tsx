
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-red-900/20 border border-red-500/50 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="mt-4 text-xl font-semibold text-red-300">An Error Occurred</h3>
      <p className="mt-2 text-red-400 max-w-md">{message}</p>
      <p className="mt-2 text-xs text-gray-400">Please check your API key or try again later.</p>
    </div>
  );
};

export default ErrorDisplay;
