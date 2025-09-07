
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-4 text-center text-gray-500 text-sm border-t border-gray-700/50">
      <p>Powered by Google Gemini &amp; Google Search</p>
      <p>&copy; {new Date().getFullYear()} Home Run Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
