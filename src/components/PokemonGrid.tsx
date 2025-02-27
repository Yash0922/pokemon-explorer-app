import React from 'react';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types/pokemon';

interface PokemonGridProps {
  pokemons: Pokemon[];
  isLoading: boolean;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({ pokemons, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-2xl font-semibold text-gray-700">No Pokémon found</h3>
        <p className="text-gray-500 mt-2">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} className="h-full">
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default PokemonGrid;