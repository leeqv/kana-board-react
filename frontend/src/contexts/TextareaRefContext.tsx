import { createContext } from 'react';

export const TextareaRefContext =
  createContext<React.RefObject<HTMLTextAreaElement | null> | null>(null);
