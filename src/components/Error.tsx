'use client';

import React from 'react';
import Link from 'next/link';

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message = "Something went wrong" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h2 className="text-3xl font-bold text-pokemon-red mb-4">Oops!</h2>
      <p className="text-xl text-gray-700 mb-6">{message}</p>
      <Link
        href="/"
        className="bg-pokemon-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;