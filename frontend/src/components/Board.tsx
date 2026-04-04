// import { useEffect, useRef, useState } from "react"
import { useRef, useState } from "react"
import KanjiSearch from "./KanjiSearch";
import KanaBoard from "./KanaBoard";

type BoardType = {
	setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

function Board({
	setFavorites,
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
			/>
    </>
  );
}

export default Board;