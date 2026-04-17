import KanjiSearch from "./KanjiSearch";
import KanaBoard from "./KanaBoard";
import type { KanjiDictItem } from "../types/KanjiDictItem";

type BoardType = {
	setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
	setFavoriteKanjis: React.Dispatch<React.SetStateAction<KanjiDictItem[]>>;
	text: string;
	setText: React.Dispatch<React.SetStateAction<string>>;
	textareaRef: React.RefObject<HTMLTextAreaElement | null>;
	favoriteKanjis: KanjiDictItem[];
}

function Board({
	setFavorites,
	setFavoriteKanjis,
	text,
	setText,
	textareaRef,
	favoriteKanjis,
} : BoardType) {

  return (
    <>
      <KanaBoard 
				text={text}
				setText={setText}
				textareaRef={textareaRef}
				setFavorites={setFavorites}
			/>

			<KanjiSearch 
				// kanaCursorRef={cursorRef}
				setText={setText}
				kanaTextareaRef={textareaRef}
				setFavoriteKanjis={setFavoriteKanjis}
				favoriteKanjis={favoriteKanjis}
			/>
    </>
  );
}

export default Board;