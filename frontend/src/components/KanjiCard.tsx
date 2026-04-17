import { memo, useRef, useState } from "react";
import type { KanjiCardItem } from "../types/KanjiCardItem";
import FaveButton from "./buttons/FaveButton";
import type { KanjiDictItem } from "../types/KanjiDictItem";
import insertToText from "../utils/insertToText";

const KanjiCard = memo(function KanjiCard({ 
  entry,
  setText,
  kanaTextareaRef,
  showDefinition,
  setFavoriteKanjis,
  favoriteKanjis,
} : KanjiCardItem) {
  const {kanji, definition} = entry;

  const isFavorite = favoriteKanjis.some(item => item.kanji === kanji);

  const definitionElement = (
    <span className="kanji-card__def">
      {definition}
    </span>
  );

  const [status, setStatus] = useState<"idle" | "hover" | "clicked">("idle");
  const timerRef = useRef<number | null>(null);

  function handleMouseEnter() {
    timerRef.current = setTimeout(() => {
      setStatus("hover");
    }, 1000);
  }

  function handleMouseLeave() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      setStatus("idle");
    }
  }

  function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    // left click only
    if (e.button !== 0) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      setStatus("idle");
    }
    insertToText(e, kanji, kanaTextareaRef, setText);
  }
  
  return (
    <div className="kanji-card">
      <button 
        type="button"
        onMouseDown={handleMouseDown}
        className="kanji-card__btn"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="kanji-card__kanji">
          {kanji}
        </span>
        {showDefinition && definitionElement}
        <span className={`btn-icon__tooltip${(status === "hover") ? ' show' : ''}`}>
          Insert to text
        </span>
      </button>
      <FaveButton<KanjiDictItem>
        value={entry}
        setFavorites={setFavoriteKanjis}
        disabled={false}
        className={`btn-icon kanji-card__fave${isFavorite ? ' active' : ''}`}
        hideCheck={true}
      />
    </div>
  );
});

export default KanjiCard;