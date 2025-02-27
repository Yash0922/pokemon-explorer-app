// Global type declarations

// Ensure that the Pokemon types are recognized
declare module '@/types/pokemon' {
    export interface Pokemon {
      name: string;
      url: string;
    }
    
    export interface PokemonListResponse {
      count: number;
      next: string | null;
      previous: string | null;
      results: Pokemon[];
    }
    
    export interface PokemonType {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
    
    export interface PokemonAbility {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }
    
    export interface PokemonStat {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }
    
    export interface PokemonMove {
      move: {
        name: string;
        url: string;
      };
    }
    
    export interface PokemonSprites {
      front_default: string;
      front_shiny: string;
      back_default: string;
      back_shiny: string;
      other: {
        'official-artwork': {
          front_default: string;
        };
        home: {
          front_default: string;
        };
      };
    }
    
    export interface PokemonDetail {
      id: number;
      name: string;
      height: number;
      weight: number;
      types: PokemonType[];
      abilities: PokemonAbility[];
      stats: PokemonStat[];
      moves: PokemonMove[];
      sprites: PokemonSprites;
      species: {
        name: string;
        url: string;
      };
    }
  }
  
  // Ensure that cache utils are recognized
  declare module '@/utils/cache' {
    export const DEFAULT_REVALIDATE_SECONDS: number;
    export const defaultFetchOptions: {
      next: { revalidate: number };
      headers: { 'Content-Type': string };
    };
    export const dynamicFetchOptions: {
      cache: RequestCache;
      headers: { 'Content-Type': string };
    };
    export function getRevalidateOptions(seconds?: number): {
      next: { revalidate: number };
      headers: { 'Content-Type': string };
    };
  }