function insertToText(
  e: React.MouseEvent<HTMLButtonElement>,
  value: string,
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  setText: React.Dispatch<React.SetStateAction<string>>,
) {
  /**
   * We use MOUSE DOWN (instead of CLICK) to prevent focus 
   * mousedown ➡ blur textarea ➡ focus button ➡ click
   */
  e.preventDefault();

  // Always focus back to kana textarea
  textareaRef.current?.focus();

  // const cursorPos = kanaCursorRef.current;
  const cursorPos = textareaRef.current?.selectionStart || 0;
  
  setText(t => {
    /**
     * Access to ref inside state setter is after re-render. 
     * The ref update in the line after this state setter will happen first before this ref access. That's why we will get the updated cursor index even before updating the text state.
     * 
     * const cursorPos = kanaCursorRef.current;
     */

    const textBefore = t.slice(0, cursorPos);
    const textAfter = t.slice(cursorPos, t.length);

    /**
     * Can't update ref inside state setter because ref updates immediately.
     * State update happens after re-render. So newText will use the updated ref.
     * 
     * kanaCursorRef.current = kanaCursorRef.current + kanji.length;
     */

    return (textBefore + value + textAfter);
  });

  const newCursorPos = cursorPos + value.length;

  requestAnimationFrame(() => {
    textareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
  });
 
  /**
   * No need to manually set the cursor index of textarea. It is updated everytime the text state changes (useEffect)
   * textareaRef.current?.setSelectionRange(cursorRef.current + kanji.length, cursorRef.current + kanji.length);
   */
}

export default insertToText;