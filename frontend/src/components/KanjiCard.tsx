import type { KanjiCardItem } from "../types/KanjiCardItem";

function KanjiCard({ 
  kanji,
  definition,
  // kanaCursorRef,
  setText,
  kanaTextareaRef,
  showDefinition,
} : KanjiCardItem) {

  function clickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    /**
     * We use mouse down listener to prevent focus 
     * mousedown ➡ blur textarea ➡ focus button ➡ click
     */
    e.preventDefault();

    // Always focus back to kana textarea
    kanaTextareaRef.current?.focus();

    // const cursorPos = kanaCursorRef.current;
    const cursorPos = kanaTextareaRef.current?.selectionStart || 0;
    
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

      return (textBefore + kanji + textAfter);
    });

    const newCursorPos = cursorPos + kanji.length;

    requestAnimationFrame(() => {
      kanaTextareaRef.current?.setSelectionRange(newCursorPos, newCursorPos);
    });
   
    /**
     * No need to manually set the cursor index of textarea. It is updated everytime the text state changes (useEffect)
     * kanaTextareaRef.current?.setSelectionRange(cursorRef.current + kanji.length, cursorRef.current + kanji.length);
     */
	}

  const definitionElement = (
    <span className="kanji-card__def">
      {definition}
    </span>
  );

  return (
    <button 
      type="button"
      onMouseDown={clickHandler}
      className="kanji-card"
    >
      <span className="kanji-card__kanji">
        {kanji}
      </span>
      {showDefinition && definitionElement}
    </button>
  );
}

export default KanjiCard;