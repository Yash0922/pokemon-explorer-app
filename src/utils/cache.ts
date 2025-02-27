// Cache configuration for data fetching

export const DEFAULT_REVALIDATE_SECONDS = 3600; // 1 hour

export const defaultFetchOptions = {
  next: { 
    revalidate: DEFAULT_REVALIDATE_SECONDS 
  },
  headers: {
    'Content-Type': 'application/json',
  },
};

export const dynamicFetchOptions = {
  cache: 'no-store' as RequestCache,
  headers: {
    'Content-Type': 'application/json',
  },
};

export function getRevalidateOptions(seconds?: number) {
  return {
    next: { 
      revalidate: seconds || DEFAULT_REVALIDATE_SECONDS 
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };
}