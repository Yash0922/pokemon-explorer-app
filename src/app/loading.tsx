import React from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function Loading() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="relative w-24 h-24 animate-spin">
          <Image src="/pokeball.svg" alt="Loading" fill priority />
        </div>
        <p className="mt-6 text-2xl font-medium text-gray-700">Loading Pokémon...</p>
        <p className="mt-2 text-gray-500">Please wait while we catch 'em all!</p>
      </div>
    </>
  );
}