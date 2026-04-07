import transliterate from "../utils/transliterate";
import ClearButton from "./buttons/ClearButton";
import CopyButton from "./buttons/CopyButton";
import FaveButton from "./buttons/FaveButton";

type KanaBoardType = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
	setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
}

function KanaBoard({
  text,
  setText,
  textareaRef,
	setFavorites,
} : KanaBoardType ) {

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

	// const [faveButtonText, setfaveButtonText] = useState<"Save" | "Saved!">("Save");
	// const faveButtonIcon = faveButtonText === "Save" ? <HeartIcon className="button__icon" /> : <CheckIcon className="button__icon" />;
  
	// function addToFavorites() {
	// 	setFavorites(faves => {
	// 		if (!faves.includes(text)) {
	// 			return [...faves, text];
	// 		} else {
	// 			return faves;
	// 		}
	// 	})
	// 	setfaveButtonText("Saved!");
	// 	setTimeout(() => setfaveButtonText("Save"), 2000);
	// }

  return (
    <div className="board">
      <div className="board__box">
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
      <div className="button-group board__actions">
				<CopyButton 
					text={text}
				/>
				<FaveButton<string>
					value={text}
					setFavorites={setFavorites}
					disabled={!text.length ? true : false}
				/>
			</div>
    </div>
  );

}

export default KanaBoard;