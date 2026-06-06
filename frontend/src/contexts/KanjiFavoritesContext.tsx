import { createContext } from 'react';
import type { KanjiDictItem } from '../types/KanjiDictItem';

type KanjiFavoritesContextType = {
  kanjiFavorites: KanjiDictItem[];
  setKanjiFavorites: React.Dispatch<React.SetStateAction<KanjiDictItem[]>>;
};

export const KanjiFavoritesContext =
  createContext<KanjiFavoritesContextType | null>(null);
