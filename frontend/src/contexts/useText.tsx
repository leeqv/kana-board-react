import { useContext } from 'react';
import { TextContext } from './TextContext';

export function useText() {
  const ctx = useContext(TextContext);

  if (!ctx) {
    throw new Error('useText must be used within TextProvider');
  }

  return ctx;
}
