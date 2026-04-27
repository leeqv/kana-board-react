import { memo } from "react";
import type { KanjiCardItem } from "../types/KanjiCardItem";
import FaveButton from "./buttons/FaveButton";
import type { KanjiDictItem } from "../types/KanjiDictItem";
import insertToText from "../utils/insertToText";
import ButtonWithTooltip from "./buttons/ButtonWithTooltip";

const KanjiCard = memo(function KanjiCard({ 
  entry,
  setText,
  kanaTextareaRef,
  showDefinition,
  setFavoriteKanjis,
  favoriteKanjis,
} : KanjiCardItem) {
  const {kanji, definition} = entry;

  function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    // left click only
    if (e.button !== 0) return;
    insertToText(e, kanji, kanaTextareaRef, setText);
  }
  
  return (
    <div className="kanji-card">
      <ButtonWithTooltip
        type="Insert"
        mouseDownHandler={handleMouseDown}
        className="kanji-card__btn"
      >
        <span className="kanji-card__kanji">
          {kanji}
        </span>
        {showDefinition && (
          <span className="kanji-card__def">
            {definition}
          </span>
        )}
      </ButtonWithTooltip>
      <FaveButton<KanjiDictItem>
        value={entry}
        setFavorites={setFavoriteKanjis}
        className="btn-icon kanji-card__fave"
        isFavorite={favoriteKanjis.some(item => item.kanji === kanji)}
      />
    </div>
  );
});

export default KanjiCard;