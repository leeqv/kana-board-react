import { useEffect, useRef, useState } from 'react';
import './css/main.scss';
import Drawer from './components/Drawer';
import type { KanjiDictItem } from './types/KanjiDictItem';
import { STORAGE_KEYS } from './constants/storageKeys';
import KanaBoard from './components/KanaBoard';
import KanjiSearch from './components/KanjiSearch';
import { TextContext } from './contexts/TextContext';
import { TextareaRefContext } from './contexts/TextareaRefContext';
import { FavoritesContext } from './contexts/FavoritesContext';
import { KanjiFavoritesContext } from './contexts/KanjiFavoritesContext';

function getLocalFavorites() {
  const item = localStorage.getItem(STORAGE_KEYS.favorites);
  return item ? JSON.parse(item) : [];
}

function getLocalFavoriteKanjis() {
  const item = localStorage.getItem(STORAGE_KEYS.kanjiFavorites);
  return item ? JSON.parse(item) : [];
}

function App() {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Pass an initializer function (React saves the initial state once and ignores it on the next renders. React will only call it during initialization.) - from react.dev
  const [favorites, setFavorites] = useState<string[]>(getLocalFavorites);
  const [kanjiFavorites, setKanjiFavorites] = useState<KanjiDictItem[]>(
    getLocalFavoriteKanjis,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.kanjiFavorites,
      JSON.stringify(kanjiFavorites),
    );
  }, [kanjiFavorites]);

  const isNotFound = window.location.pathname !== '/';

  // "React will always place the DOM element corresponding to the <title> component within the document’s <head>, regardless of where in the React tree it is rendered."
  // https://react.dev/reference/react-dom/components/title#special-rendering-behavior

  return (
    <>
      {isNotFound ? (
        <>
          <title>
            404 - Page Not Found | Kana-Board: Online Japanese keyboard
          </title>
          <meta
            name="description"
            content="The page you are looking for does not exist."
          ></meta>
        </>
      ) : (
        <>
          <title>Kana-Board: Online Japanese keyboard</title>
          <meta
            name="description"
            content="Online Japanese keyboard with romaji to hiragana and katakana transliteration, and kanji search using the Jisho API."
          />
        </>
      )}
      <TextareaRefContext value={textareaRef}>
        <TextContext value={{ text, setText }}>
          <FavoritesContext value={{ favorites, setFavorites }}>
            <KanjiFavoritesContext
              value={{ kanjiFavorites, setKanjiFavorites }}
            >
              <div className="content">
                <header className="header">
                  {isNotFound ? (
                    <a className="header__logo header__logo--link" href="/">
                      <span className="header__jp">かな·ボード</span>
                      <h1 className="header__title">Kana-Board</h1>
                    </a>
                  ) : (
                    <div className="header__logo">
                      <span className="header__jp">かな·ボード</span>
                      <h1 className="header__title">Kana-Board</h1>
                    </div>
                  )}
                </header>
                <main>
                  {isNotFound ? (
                    <div className="not-found">
                      <h1 className="not-found__title">404 - Page Not Found</h1>
                      <p>This page does not exist.</p>
                      <a href="/" className="button not-found__button">
                        Return Home
                      </a>
                    </div>
                  ) : (
                    <>
                      <KanaBoard />
                      <KanjiSearch />
                    </>
                  )}
                </main>
                <footer className="footer">
                  <span>
                    Uses API from&nbsp;
                    <a
                      href="https://jisho.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Jisho.org
                      <img
                        src="/icons/jisho.svg"
                        alt=""
                        className="footer__icon"
                      />
                    </a>
                  </span>
                  <span className="footer__kaomoji">°˖✧◝( ᵔ ᵕ ᵔ )◜✧˖°</span>
                  <span>
                    View source on&nbsp;
                    <a
                      href="https://github.com/leeqv"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                      <img
                        src="/icons/github.svg"
                        alt=""
                        className="footer__icon"
                      />
                    </a>
                  </span>
                </footer>
              </div>
              {!isNotFound ? <Drawer /> : ''}
            </KanjiFavoritesContext>
          </FavoritesContext>
        </TextContext>
      </TextareaRefContext>
    </>
  );
}

export default App;
