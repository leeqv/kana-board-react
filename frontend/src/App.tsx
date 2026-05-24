import { useEffect, useRef, useState } from 'react';
import './css/main.scss';
import Board from './components/Board';
import Drawer from './components/Drawer';
import type { KanjiDictItem } from './types/KanjiDictItem';
import { STORAGE_KEYS } from './constants/storageKeys';

function getLocalFavorites() {
  const item = localStorage.getItem(STORAGE_KEYS.favorites);
  return item ? JSON.parse(item) : [];
}

function getLocalFavoriteKanjis() {
  const item = localStorage.getItem(STORAGE_KEYS.favoriteKanjis);
  return item ? JSON.parse(item) : [];
}

function App() {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Pass an initializer function (React saves the initial state once and ignores it on the next renders. React will only call it during initialization.) - from react.dev
  const [favorites, setFavorites] = useState<string[]>(getLocalFavorites);
  const [favoriteKanjis, setFavoriteKanjis] = useState<KanjiDictItem[]>(
    getLocalFavoriteKanjis,
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.favoriteKanjis,
      JSON.stringify(favoriteKanjis),
    );
  }, [favoriteKanjis]);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <span className="header__jp">かな·ボード</span>
          <h1 className="header__title">Kana-Board</h1>
        </div>
      </header>

      <main>
        <Board
          setFavorites={setFavorites}
          setFavoriteKanjis={setFavoriteKanjis}
          text={text}
          setText={setText}
          textareaRef={textareaRef}
          favoriteKanjis={favoriteKanjis}
          favorites={favorites}
        />
      </main>

      <Drawer
        favorites={favorites}
        setFavorites={setFavorites}
        favoriteKanjis={favoriteKanjis}
        setFavoriteKanjis={setFavoriteKanjis}
        setText={setText}
        textareaRef={textareaRef}
      />
    </>
  );
}

export default App;
