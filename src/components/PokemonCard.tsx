'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const pokemonId = pokemon.url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <Link href={`/pokemon/${pokemonId}`} className="block h-full">
      <div className="pokemon-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="p-4 text-center">
          <div className="bg-gray-100 rounded-lg p-6 mb-4 relative">
            <div className="relative w-40 h-40 mx-auto">
              <Image
                src={imageUrl}
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                loading="lazy"
                priority={false}
                quality={75}
              />
            </div>
            <span className="absolute top-2 right-2 bg-pokemon-red text-white text-xs font-semibold rounded-full h-6 w-6 flex items-center justify-center">
              #{pokemonId}
            </span>
          </div>
          <h3 className="text-xl font-semibold capitalize mb-2 text-pokemon-dark">
            {pokemon.name.replace(/-/g, ' ')}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;