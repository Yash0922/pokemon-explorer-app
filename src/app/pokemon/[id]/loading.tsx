import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function PokemonDetailLoading() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="relative w-24 h-24 animate-spin">
            <Image src="/pokeball.svg" alt="Loading" fill priority />
          </div>
          <p className="mt-6 text-2xl font-medium text-gray-700">Loading Pokémon...</p>
          <p className="mt-2 text-gray-500">Preparing detailed information</p>
        </div>
      </div>
    </>
  );
}