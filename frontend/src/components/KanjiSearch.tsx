import { memo, useRef, useState } from "react";
import type { KanjiDictItem } from "../types/KanjiDictItem";
import transliterate from "../utils/transliterate";
import ClearButton from "./buttons/ClearButton";
import KanjiCard from "./KanjiCard";
import type { KanjiSearchStatus } from "../types/KanjiSearchStatus";
import XMarkIcon from "./icons/XMarkIcon";
import getJishoData from "../utils/getJishoData";

// Prop drilling for KanjiCard component...
type KanjiSearchType = {
  // kanaCursorRef: React.RefObject<number>;

  // Modify text after picking kanji card
  setText: React.Dispatch<React.SetStateAction<string>>;
  
  // Focus kana textarea after card click (mouse down)
  kanaTextareaRef: React.RefObject<HTMLTextAreaElement | null>;

  setFavoriteKanjis: React.Dispatch<React.SetStateAction<KanjiDictItem[]>>;
}

// Memoize to prevent re-render when state in parent changes (will only re-render when props change)
const KanjiSearch = memo(function KanjiSearch({
  setText,
  kanaTextareaRef,
  setFavoriteKanjis,
} : KanjiSearchType) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<KanjiDictItem[]>([]);
  const [status, setStatus] = useState<KanjiSearchStatus>("idle");
  const [showDefinition, setShowDefinition] = useState(false);

	const inputboxRef = useRef<HTMLInputElement>(null);
	const cachedResultsRef = useRef<Record<string, KanjiDictItem[]>>({});
	const previousInputRef = useRef<string>("");
  const previousInput = previousInputRef.current;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    transliterate(e, inputboxRef, setInput, true);
  }

  async function handleSearchButtonClick() {
    if (
      // Get new result when the current query is different from the previous one...
      (previousInput !== input)
      ||
      // ...or when the results list is still empty.
      (status === "idle")
    ) {
      previousInputRef.current = input

      // Reset results while loading
      setStatus("loading");
      setResults([]);

      let foundResult = [];
      let foundError:unknown;

      /**
       * Option 1: Find kanji in cached results.
       * Client side caching to prevent duplicate API requests.
       */
      const cachedResult = cachedResultsRef.current[input];
      if (cachedResult) {
        foundResult = cachedResult;
      } else {
        /**
         * Option 2: Call Jisho API
         */
        const [jishoResult, jishoError] = await getJishoData(
          input,
        );
        foundResult = jishoResult;
        foundError = jishoError;
        cachedResultsRef.current[input] = jishoResult;
      }

      if (foundResult.length > 0) {
        setStatus("success");
      } else if (foundError) {
        if (foundError instanceof Error) {
          console.error(foundError);
          setStatus("connection-error");
        } else {
          console.error("Unknown error", foundError);
          setStatus("unknown-error");
        }
      } else {
        setStatus("not-found");
      }

      setResults(foundResult);
    }
  }

  function showResults() {
    let mainElement;

    if (status === "success") {
      mainElement = (
        <div className="search__results-list">
          {
            results.map((result, index) => 
              <KanjiCard
                key={index}
                entry={result}
                setText={setText}
                kanaTextareaRef={kanaTextareaRef}
                showDefinition={showDefinition}
                setFavoriteKanjis={setFavoriteKanjis}
              />
            )
          }
        </div>
      );
    } else if (
      status === "not-found" || 
      status === "connection-error" || 
      status === "unknown-error"
    ) {
      const infoDict = {
        "not-found": `No results found for ${input}. Try something else. 😅`,
        "connection-error": "Network connection failed. 😓",
        "unknown-error": "Unknown error occurred. 😓",
      }

      mainElement = (
        <div className="search__info">
          {infoDict[status]}
        </div>
      );
    }

    return (
      <div className="search__results">
        {
          <button
            onClick={() => setStatus("idle")}
            type="button"
            className={"button button--icon-only search__close-button"}
          >
            <XMarkIcon className="button__icon" />
          </button>
        }
        { mainElement }
      </div>
    );
  }

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
          {input.length > 0 && 
            <ClearButton
              setInput={setInput}
              inputElementRef={inputboxRef}
              className="search__clear-button"
            />
          }
        </div>
        <button 
          type="button"
          onClick={handleSearchButtonClick}
          disabled={(!input.length || (status === "loading")) ? true : false}
          >
          Get kanji
        </button>
        <div className="search__toggle-def">
          <label className="search__toggle-def-label">
            <input 
              type="checkbox" 
              className="search__toggle-def-check"
              onChange={() => setShowDefinition(s => !s)}
            />
            Show definitions
          </label>
        </div>
      </div>

      {(status !== "idle" && status !== "loading") && showResults()}

      {status === "loading" && (
        <div className="search__loader">
          <div className="search__loader-icon"></div>
        </div>
      )}
    </div>
  );
});

export default KanjiSearch;