import React from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border-b border-gray-200">
      <button className="text-gray-600 hover:text-gray-800">
        <Menu size={24} />
      </button>
      <a href="/" className="flex items-center gap-2 transition-opacity duration-300 hover:opacity-90">
        <img 
          src="/latspace-logo.svg"
          alt="LatSpace - Climate Disclosure Platform"
          className="h-8 w-auto"
        />
        <span className="text-xl font-semibold">LatSpace</span>
      </a>
    </div>
  );
};

export default Header;