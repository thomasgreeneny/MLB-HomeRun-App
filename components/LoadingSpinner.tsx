
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-300">Asking the AI umpire...</p>
        <p className="text-sm text-gray-500">Please wait while we gather the latest home run data.</p>
    </div>
  );
};

export default LoadingSpinner;
