'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 shadow-lg">
      {/* Main navbar container with the split design */}
      <div className="relative h-16 sm:h-20">
        {/* Red background for top half */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-pokemon-red"></div>
        {/* White background for bottom half */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"></div>
        
        {/* Center black divider */}
        <div className="absolute left-0 right-0 h-4 sm:h-6 bg-black top-1/2 -translate-y-1/2"></div>
        
        {/* Pokeball center button */}
        <div className="absolute right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white border-4 sm:border-8 border-black z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 sm:border-4 border-black"></div>
        </div>
        
        {/* Content container positioned over the backgrounds */}
        <div className="container mx-auto px-4 h-full flex justify-between items-center relative z-5">
          {/* Logo and brand name */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="relative w-10 h-10 sm:w-14 sm:h-14">
              <Image 
                src="/pokeball.svg" 
                alt="Pokemon Explorer Logo" 
                fill
                priority
                className="animate-bounce-slow"
              />
            </div>
            <span className="hidden sm:inline text-white font-bold text-lg sm:text-xl">
  Pokémon Explorer
</span>


          </Link>
          
          {/* Desktop Navigation links */}
          <div className="hidden sm:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-white hover:text-pokemon-yellow transition-colors duration-200 font-medium drop-shadow-md"
            >
              Home
            </Link>
            <Link 
              href="/favorites" 
              className="text-white hover:text-pokemon-yellow transition-colors duration-200 font-medium drop-shadow-md"
            >
              Favorites
            </Link>
            <Link 
              href="https://github.com/yourusername/pokemon-explorer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-pokemon-yellow hover:bg-yellow-500 text-pokemon-dark px-4 py-2 rounded-full font-bold transition-colors duration-200"
            >
              GitHub
            </Link>
          </div>
            
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="sm:hidden text-white p-2 rounded-full hover:bg-black/20 transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`${
          isMenuOpen ? 'max-h-60 border-b' : 'max-h-0 border-b-0'
        } sm:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-gray-200`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-3 pb-3">
            <Link 
              href="/" 
              className="text-pokemon-dark hover:text-pokemon-red font-medium px-2 py-2 rounded hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/favorites" 
              className="text-pokemon-dark hover:text-pokemon-red font-medium px-2 py-2 rounded hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link 
              href="https://github.com/Yash0922/pokemon-explorer-app.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-pokemon-yellow hover:bg-yellow-500 text-pokemon-dark px-4 py-2 rounded-full font-bold transition-colors duration-200 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;