// header.tsx

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 py-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-white text-lg font-bold">
          <Link href="/">
            <span>My App</span>
          </Link>
        </div>
        <div className="text-white">
          <Link href="/about">
            <span className="px-4 py-2 hover:underline">About</span>
          </Link>
          <Link href="/contact">
            <span className="px-4 py-2 hover:underline">Contact</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
