'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce function
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  // Apply debounce to search query updates
  const debouncedSetSearchQuery = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    [setSearchQuery, debounce]
  );

  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchQuery(value);
  };

  // Clear input
  const handleClearInput = () => {
    setInputValue('');
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Focus input on initial render
  useEffect(() => {
    if (inputRef.current && !searchQuery) {
      inputRef.current.focus();
    }
  }, [searchQuery]);

  // Sync input value with searchQuery from props
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4 relative z-10">
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <div className={`
            bg-white shadow-lg rounded-full transition-all duration-300 
            ${isFocused ? 'shadow-pokemon-red/30 ring-2 ring-pokemon-red/50' : 'hover:shadow-xl'}
          `}>
            <div className="flex items-center">
              <div className="absolute left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className={`w-6 h-6 transition-colors duration-300 ${isFocused ? 'text-pokemon-red' : 'text-gray-500'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                ref={inputRef}
                type="search"
                className="w-full py-4 sm:py-5 pl-14 pr-12 text-base sm:text-lg text-gray-800 font-medium bg-transparent rounded-full outline-none"
                placeholder="Search for a Pokémon..."
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label="Search for a Pokémon"
              />
              {inputValue && (
                <div className="absolute right-4 flex items-center">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-pokemon-red rounded-full hover:bg-gray-100 transition-colors duration-200"
                    onClick={handleClearInput}
                    aria-label="Clear search"
                  >
                  
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
        
        {/* Pokeball decorative element */}
        <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-pokemon-red opacity-20 animate-pulse"></div>
        <div className="absolute -right-4 -bottom-4 w-10 h-10 rounded-full bg-pokemon-blue opacity-20 animate-pulse delay-700"></div>
      </div>
      
      {/* Search hints or quick filters */}
      {/* {isFocused && (
        <div className="px-4 pt-2 pb-1 flex flex-wrap justify-center gap-2 text-sm">
          <span 
            onClick={() => {setInputValue('fire'); setSearchQuery('fire')}} 
            className="px-3 py-1 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 transition-colors duration-200"
          >
            Fire
          </span>
          <span 
            onClick={() => {setInputValue('water'); setSearchQuery('water')}} 
            className="px-3 py-1 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-200"
          >
            Water
          </span>
          <span 
            onClick={() => {setInputValue('grass'); setSearchQuery('grass')}} 
            className="px-3 py-1 bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-600 transition-colors duration-200"
          >
            Grass
          </span>
          <span 
            onClick={() => {setInputValue('electric'); setSearchQuery('electric')}} 
            className="px-3 py-1 bg-yellow-500 text-white rounded-full cursor-pointer hover:bg-yellow-600 transition-colors duration-200"
          >
            Electric
          </span>
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;