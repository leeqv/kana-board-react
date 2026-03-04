// import { useEffect, useRef, useState } from "react"
import { useRef, useState } from "react"
import KanjiSearch from "./KanjiSearch";
import KanaBoard from "./KanaBoard";

function Board() {
	const [text, setText] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <KanaBoard 
				text={text}
				setText={setText}
				textareaRef={textareaRef}
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