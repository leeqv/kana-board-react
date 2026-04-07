// import { useEffect, useRef, useState } from "react"
import { useRef, useState } from "react"
import KanjiSearch from "./KanjiSearch";
import KanaBoard from "./KanaBoard";
import type { KanjiCardItem } from "../types/KanjiCardItem";

type BoardType = {
	setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
	setFavoriteKanjis: React.Dispatch<React.SetStateAction<KanjiDictItem[]>>;
}

function Board({
	setFavorites,
	setFavoriteKanjis,
} : BoardType) {
	const [text, setText] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

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
			/>
    </>
  );
}

export default Board;