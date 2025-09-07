
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center border-b border-gray-700/50">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
        MLB Weekly Home Run Tracker
      </h1>
      <p className="mt-3 text-lg text-gray-400">
        AI-Powered Report of This Week's Biggest Hits
      </p>
    </header>
  );
};

export default Header;
