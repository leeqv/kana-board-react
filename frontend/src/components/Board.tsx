// import { useEffect, useRef, useState } from "react"
import { useRef, useState } from "react"
import transliterate from "../utils/transliterate";
import KanjiSearch from "./KanjiSearch";
import CopyButton from "./CopyButton";
import ClearButton from "./ClearButton";

function Board() {
	const [text, setText] = useState("");

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// We can just use rAF ref.current updates instead of using a ref for cursor index...
	// const cursorRef = useRef<number>(0);
	// useEffect(() => {
	// 	if (cursorRef.current === null || !textareaRef.current) return;

	// 	// Cursor not at the end, update cursor position
	// 	if (cursorRef.current !== textareaRef.current.value.length) {
	// 		textareaRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
	// 	}
	// }, [text]);

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		// transliterate(e, cursorRef, setText);
		transliterate(e, textareaRef, setText);

		// Setting text state from KanjiCard does not trigger onChange event
		// console.log("textarea change");
  }

	function handleTextareaBlur() {
		textareaRef.current?.setSelectionRange(text.length, text.length)
	}

  return (
    <>
      <div className="board">
				<textarea 
					value={text}
					onChange={handleTextareaChange}
					ref={textareaRef}
					autoFocus
					// onClick={() => {cursorRef.current = textareaRef.current?.selectionStart || 0}}
					// onKeyUp={() => {cursorRef.current = textareaRef.current?.selectionStart || 0}}
					onBlur={handleTextareaBlur}
					className="board__textarea"
				/>
				{text.length > 0 && 
					<ClearButton
						setInput={setText}
						inputElementRef={textareaRef}
						className="board__clear-button"
					/>
				}
			</div>

			<div className="button-group">
				<CopyButton 
					text={text}
				/>
			</div>

			<KanjiSearch 
				// kanaCursorRef={cursorRef}
				setText={setText}
				kanaTextareaRef={textareaRef}
			/>
    </>
  );
}

export default Board;