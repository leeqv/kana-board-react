import { createContext } from 'react';

type TextContextType = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

export const TextContext = createContext<TextContextType | null>(null);
