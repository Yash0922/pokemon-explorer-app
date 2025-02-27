import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <div className="relative w-40 h-40 mb-6">
        <Image
          src="/sad-pikachu.svg"
          alt="404 Not Found"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-4xl font-bold text-pokemon-red mb-3">
        404 - Page Not Found
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-pokemon-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}