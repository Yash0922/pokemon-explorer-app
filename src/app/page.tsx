'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import PokemonGrid from '../components/PokemonGrid';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { fetchPokemons, searchPokemons } from '../services/pokemonService';
import { Pokemon } from '@/types/pokemon';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialSearch = searchParams.get('search') || '';
  
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await fetchPokemons(ITEMS_PER_PAGE, offset);
        
        setPokemons(response.results);
        setTotalPages(Math.ceil(response.count / ITEMS_PER_PAGE));
        
        // Update URL with page parameter if no search is active
        if (!searchQuery) {
          const params = new URLSearchParams();
          if (currentPage !== 1) params.set('page', currentPage.toString());
          const newUrl = params.toString() ? `/?${params.toString()}` : '/';
          router.push(newUrl);
        }
      } catch (err) {
        setError('Failed to load Pokémon data. Please try again later.');
        console.error('Error loading pokemons:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!searchQuery) {
      loadPokemons();
    }
  }, [currentPage, searchQuery, router]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery) {
        setFilteredPokemons([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await searchPokemons(searchQuery);
        setFilteredPokemons(response.results);
        setTotalPages(1); // No pagination for search results
        
        // Update URL with search parameter
        const params = new URLSearchParams();
        params.set('search', searchQuery);
        if (currentPage !== 1) params.set('page', currentPage.toString());
        router.push(`/?${params.toString()}`);
      } catch (err) {
        setError('Failed to search Pokémon. Please try again later.');
        console.error('Error searching pokemons:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery, currentPage, router]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL to maintain state on refresh
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (searchQuery) params.set('search', searchQuery);
    router.push(`/?${params.toString()}`);
  }, [searchQuery, router]);

  if (error) {
    return (
      <>
        <Navbar />
        <Error message={error} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-pokemon-dark mb-3">Pokémon Explorer</h1>
          <p className="text-gray-600">
            Search and discover your favorite Pokémon from the Pokémon universe
          </p>
        </section>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {isLoading && <Loading />}
        
        {!isLoading && (
          <PokemonGrid 
            pokemons={searchQuery ? filteredPokemons : pokemons} 
            isLoading={isLoading} 
          />
        )}

        {!searchQuery && !isLoading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}