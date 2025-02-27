import { PokemonListResponse, PokemonDetail } from '../types/pokemon';
import { defaultFetchOptions, dynamicFetchOptions } from '../utils/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pokeapi.co/api/v2';

export const fetchPokemons = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`, 
      defaultFetchOptions
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching Pokemon list: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const fetchPokemonDetail = async (id: string): Promise<PokemonDetail> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pokemon/${id}`,
      defaultFetchOptions
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching Pokemon details: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Pokemon with ID ${id}:`, error);
    throw error;
  }
};

export const searchPokemons = async (query: string): Promise<PokemonListResponse> => {
  try {
    // First, get all Pokemon (with a higher limit)
    // Use the dynamic fetch options to avoid caching search results
    const response = await fetch(
      `${API_BASE_URL}/pokemon?limit=1000`,
      dynamicFetchOptions
    );
    
    if (!response.ok) {
      throw new Error(`Error fetching Pokemon for search: ${response.status}`);
    }
    
    const data: PokemonListResponse = await response.json();
    
    // Filter the results based on the query
    const filteredResults = data.results.filter(pokemon => 
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      ...data,
      count: filteredResults.length,
      results: filteredResults
    };
  } catch (error) {
    console.error('Error searching Pokemon:', error);
    throw error;
  }
};