import { useContext } from 'react';
import { TextareaRefContext } from './TextareaRefContext';

export function useTextareaRef() {
  const ctx = useContext(TextareaRefContext);

  if (!ctx) {
    throw new Error('useText must be used within TextareaProvider');
  }

  return ctx;
}
