import { memo, useRef, useState } from 'react';
import type { KanjiDictItem } from '../types/KanjiDictItem';
import transliterate from '../utils/transliterate';
import ClearButton from './buttons/ClearButton';
import KanjiCard from './KanjiCard';
import type { KanjiSearchStatus } from '../types/KanjiSearchStatus';
import XMarkIcon from './icons/XMarkIcon';
import getJishoData from '../utils/getJishoData';
import ArrowIcon from './icons/ArrowIcon';

const KanjiSearch = memo(function KanjiSearch() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<KanjiDictItem[]>([]);
  const [status, setStatus] = useState<KanjiSearchStatus>('idle');
  const [showDefinition, setShowDefinition] = useState(false);

  const inputboxRef = useRef<HTMLInputElement>(null);
  const cachedResultsRef = useRef<Record<string, KanjiDictItem[]>>({});
  const previousInputRef = useRef<string>('');
  const previousInput = previousInputRef.current;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    transliterate(e, inputboxRef, setInput, true);
  }

  async function handleSearchButtonClick() {
    if (
      // Get new result when the current query is different from the previous one...
      previousInput !== input ||
      // ...or when the results list is still empty.
      status === 'idle' ||
      // allow re-try after connection error
      status === 'connection-error'
    ) {
      previousInputRef.current = input;

      // Reset results while loading
      setStatus('loading');
      setResults([]);

      let foundResult = [];
      let foundError: unknown;

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
        const { results: jishoResult, error: jishoError } =
          await getJishoData(input);
        foundResult = jishoResult;
        foundError = jishoError;
        cachedResultsRef.current[input] = jishoResult;
      }

      if (foundResult && foundResult.length > 0) {
        setStatus('success');
      } else if (foundError) {
        if (foundError instanceof Error) {
          console.error(foundError);
          setStatus('connection-error');
        } else {
          console.error('Unknown error', foundError);
          setStatus('unknown-error');
        }
      } else {
        setStatus('not-found');
      }

      setResults(foundResult);
    }
  }

  function showResults() {
    let mainElement;

    if (status === 'success') {
      mainElement = (
        <div className="search__results-list">
          {results.map((result) => (
            <KanjiCard
              key={result.kanji}
              entry={result}
              showDefinition={showDefinition}
            />
          ))}
        </div>
      );
    } else if (
      status === 'not-found' ||
      status === 'connection-error' ||
      status === 'unknown-error'
    ) {
      const infoDict = {
        'not-found': `No results found for ${previousInputRef.current}. Try something else. (⌒_⌒; )`,
        'connection-error': 'Network connection failed. (⇀‸↼‶)',
        'unknown-error': 'Unknown error occurred. (⇀‸↼‶)',
      };

      mainElement = <div className="search__info">{infoDict[status]}</div>;
    }

    return (
      <div className="search__results">
        {
          <button
            onClick={() => setStatus('idle')}
            type="button"
            className={'btn-icon search__close-button'}
          >
            <XMarkIcon className="icon" />
          </button>
        }
        {mainElement}
      </div>
    );
  }

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__box">
          <div className="search__input-box">
            <input
              type="text"
              className="search__input"
              onChange={handleInputChange}
              value={input}
              ref={inputboxRef}
            />
            {input.length > 0 && (
              <ClearButton
                setInput={setInput}
                inputElementRef={inputboxRef}
                className="btn-icon search__clear-button"
              />
            )}
          </div>
          <button
            className={`button search__get-button${status === 'loading' ? ' loading' : ''}`}
            type="button"
            onClick={handleSearchButtonClick}
            disabled={!input.length || status === 'loading'}
          >
            {status === 'loading' ? 'Loading...' : 'Get Kanji'}
            {<ArrowIcon className="button__icon" />}
          </button>
          <div className="search__toggle-def">
            <label className="search__toggle-label">
              <input
                type="checkbox"
                className="search__toggle-def-check"
                onChange={() => setShowDefinition((s) => !s)}
              />
              <span className="search__toggle-def-display">
                Show definitions
              </span>
            </label>
          </div>
        </div>

        {status !== 'idle' && status !== 'loading' && showResults()}

        {status === 'loading' && (
          <div className="search__loader">
            <div className="search__loader-icon"></div>
          </div>
        )}
      </div>
    </div>
  );
});

export default KanjiSearch;
