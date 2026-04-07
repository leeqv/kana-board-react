import { memo } from "react";
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
} : KanjiCardItem) {

  const {kanji, definition} = entry;

  const definitionElement = (
    <span className="kanji-card__def">
      {definition}
    </span>
  );

  return (
    <div>
      <button 
        type="button"
        onMouseDown={(e) => insertToText(e, kanji, kanaTextareaRef, setText)}
        className="kanji-card"
      >
        <span className="kanji-card__kanji">
          {kanji}
        </span>
        {showDefinition && definitionElement}
      </button>
      <FaveButton<KanjiDictItem>
        value={entry}
        setFavorites={setFavoriteKanjis}
        disabled={false}
        isIconOnly={true}
        className="kanji-card__fave"
      />
    </div>
  );
});

export default KanjiCard;