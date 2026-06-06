import { createContext } from 'react';

type FavoritesContextType = {
  favorites: string[];
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);
