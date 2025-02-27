'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import Navbar from '../../../components/Navbar';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { fetchPokemonDetail } from '../../../services/pokemonService';
import { PokemonDetail } from '../../../types/pokemon';

export default function PokemonDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('stats');

  useEffect(() => {
    let isMounted = true;
    
    const loadPokemonDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchPokemonDetail(id);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setPokemon(data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load Pokémon details. Please try again later.');
          console.error(`Error loading pokemon with ID ${id}:`, err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPokemonDetail();
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Loading />
      </>
    );
  }

  if (error || !pokemon) {
    return (
      <>
        <Navbar />
        <Error message={error || 'Pokémon not found'} />
      </>
    );
  }

  // Helper function to format stats name
  const formatStatName = (statName: string) => {
    const statMapping: Record<string, string> = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      'speed': 'Speed'
    };
    
    return statMapping[statName] || statName;
  };
  
  // Get the first type of the pokemon for background color
  const mainType = pokemon.types[0]?.type.name || 'normal';
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center mb-6 text-pokemon-blue hover:text-pokemon-red transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to List
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Top section with pokemon image and basic info */}
          <div className={`type-${mainType} p-8 text-white relative`}>
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-60 h-60 md:w-80 md:h-80 mx-auto md:mx-0">
                <Image
                  src={pokemon.sprites.other['official-artwork'].front_default || '/pokeball.svg'}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              
              <div className="md:ml-10 text-center md:text-left mt-6 md:mt-0">
                <div className="flex flex-col md:flex-row items-center md:items-baseline">
                  <h1 className="text-4xl font-bold capitalize mb-2 md:mb-0">
                    {pokemon.name}
                  </h1>
                  <span className="ml-0 md:ml-4 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    #{pokemon.id.toString().padStart(3, '0')}
                  </span>
                </div>
                
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                  {pokemon.types.map((typeInfo) => (
                    <span 
                      key={typeInfo.type.name} 
                      className="px-4 py-1 rounded-full bg-white/30 text-white font-medium capitalize"
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/70 text-sm">Height</p>
                    <p className="font-bold text-xl">{pokemon.height / 10} m</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm">Weight</p>
                    <p className="font-bold text-xl">{pokemon.weight / 10} kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-4 text-lg font-medium ${
                  activeTab === 'stats'
                    ? 'text-pokemon-red border-b-2 border-pokemon-red'
                    : 'text-gray-600 hover:text-pokemon-red'
                }`}
              >
                Stats
              </button>
              <button
                onClick={() => setActiveTab('abilities')}
                className={`px-6 py-4 text-lg font-medium ${
                  activeTab === 'abilities'
                    ? 'text-pokemon-red border-b-2 border-pokemon-red'
                    : 'text-gray-600 hover:text-pokemon-red'
                }`}
              >
                Abilities
              </button>
              <button
                onClick={() => setActiveTab('moves')}
                className={`px-6 py-4 text-lg font-medium ${
                  activeTab === 'moves'
                    ? 'text-pokemon-red border-b-2 border-pokemon-red'
                    : 'text-gray-600 hover:text-pokemon-red'
                }`}
              >
                Moves
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Base Stats</h2>
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700 font-medium">
                        {formatStatName(stat.stat.name)}
                      </span>
                      <span className="font-bold">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`type-${mainType} h-2.5 rounded-full`}
                        style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'abilities' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Abilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pokemon.abilities.map((ability) => (
                    <div
                      key={ability.ability.name}
                      className="bg-gray-100 p-4 rounded-lg"
                    >
                      <h3 className="text-lg font-semibold capitalize">
                        {ability.ability.name.replace('-', ' ')}
                        {ability.is_hidden && (
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            (Hidden)
                          </span>
                        )}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'moves' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Moves</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {pokemon.moves.slice(0, 30).map((moveInfo) => (
                    <div
                      key={moveInfo.move.name}
                      className="bg-gray-100 p-3 rounded-lg"
                    >
                      <p className="capitalize">
                        {moveInfo.move.name.replace('-', ' ')}
                      </p>
                    </div>
                  ))}
                </div>
                {pokemon.moves.length > 30 && (
                  <p className="mt-4 text-center text-gray-500">
                    Showing 30 of {pokemon.moves.length} moves
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}