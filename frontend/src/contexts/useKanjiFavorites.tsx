import { useContext } from 'react';
import { KanjiFavoritesContext } from './KanjiFavoritesContext';

export function useKanjiFavorites() {
  const ctx = useContext(KanjiFavoritesContext);

  if (!ctx) {
    throw new Error(
      'useKanjiFavorites must be used within KanjiFavoritesProvider',
    );
  }

  return ctx;
}
