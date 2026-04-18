'use client';

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  addFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('beecalc-favorites', []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  const addFavorite = useCallback(
    (slug: string) => setFavorites((prev) => (prev.includes(slug) ? prev : [...prev, slug])),
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (slug: string) => setFavorites((prev) => prev.filter((s) => s !== slug)),
    [setFavorites]
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      if (favorites.includes(slug)) {
        removeFavorite(slug);
      } else {
        addFavorite(slug);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  const clearFavorites = useCallback(
    () => setFavorites([]),
    [setFavorites]
  );

  const value = useMemo<FavoritesContextValue>(() => ({
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  }), [favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite, clearFavorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider');
  }
  return context;
}
