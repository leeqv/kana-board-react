import { useRef, useState } from "react";
import type { KanjiDictItem } from "../types/KanjiDictItem";
import transliterate from "../utils/transliterate";
import ClearButton from "./ClearButton";
import KanjiCard from "./KanjiCard";

// Prop drilling for KanjiCard component...
type KanjiSearchType = {
  // kanaCursorRef: React.RefObject<number>;

  // Modify text after picking kanji card
  setText: React.Dispatch<React.SetStateAction<string>>;

  // Focus kana textarea after card click (mouse down)
  kanaTextareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

function KanjiSearch({
  // kanaCursorRef,
  setText,
  kanaTextareaRef
} : KanjiSearchType) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<KanjiDictItem[]>([]);

	const inputboxRef = useRef<HTMLInputElement>(null);

  // const cursorRef = useRef<number>(0);
  // useEffect(() => {
  //   if (cursorRef.current === null || !inputboxRef.current) return;

  //   // Cursor not at the end, update cursor position
  //   if (cursorRef.current !== inputboxRef.current.value.length) {
  //     inputboxRef.current.setSelectionRange(cursorRef.current, cursorRef.current);
  //   }
  // }, [input]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    transliterate(e, inputboxRef, setInput, true);
    // transliterate(e, cursorRef, setInput, true);
  }

  async function getData() {
    /**
     * Need to use a backend as a middleman because browsers enforce CORS,
     * so React cannot call the Jisho API directly React ↔ Jisho API ❌
     * 
     * const url = "https://jisho.org/api/v1/search/words?keyword=" + input;
     */
    const url = `http://localhost:8080/api?keyword=${input}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const results = await response.json();
      setResults(results);
    } catch (error: unknown) {
      if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("Unknown error", error);
			}
    }
  }

  const resultsList = results.map((result, index) => 
    <KanjiCard
      key={index}
      kanji={result.slug}
      definition={result.definition}
      setText={setText}
      // kanaCursorRef={kanaCursorRef}
      kanaTextareaRef={kanaTextareaRef}
    />
  );

  return (
    <div className="search">
      <div className="search__box">
        <div className="search__input-box">
          <input 
            type="text" 
            className="search__input"
            onChange={handleInputChange}
            value={input}
            ref={inputboxRef}
            />
          <ClearButton
            input={input}
            setInput={setInput}
            inputElementRef={inputboxRef}
            isIconOnly={true}
          />
        </div>
        <button 
          type="button"
          onClick={getData}
          disabled={!input.length ? true : false}
          >
          Get kanji
        </button>
      </div>
      <div className="search__results">
        {resultsList}
      </div>
    </div>
  );
}

export default KanjiSearch;