import { useCallback } from 'react';
import { useTextareaRef } from '../contexts/useTextareaRef';
import { useText } from '../contexts/useText';

export function useInsertToText() {
  const textareaRef = useTextareaRef();
  const { setText } = useText();

  return useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, value: string) => {
      /**
       * We use MOUSE DOWN (instead of CLICK) to prevent removing focus on textarea
       * mousedown ➡ blur textarea ➡ focus button ➡ mouseup ➡ click
       */
      e.preventDefault();

      // Always focus back to kana textarea
      textareaRef.current?.focus();

      // No need to use ref because we don't need it to survive re-render (we get it every time mouse down)
      // const cursorPos = kanaCursorRef.current;
      const cursorPos = textareaRef.current?.selectionStart || 0;

      setText((t) => {
        const textBefore = t.slice(0, cursorPos);
        const textAfter = t.slice(cursorPos, t.length);
        return textBefore + value + textAfter;
      });

      const newCursorPos = cursorPos + value.length;
      requestAnimationFrame(() => {
        textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
      });
    },
    [textareaRef, setText],
  );
}
