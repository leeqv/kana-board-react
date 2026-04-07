import { useRef, useState } from 'react';
import './App.css'
import Board from './components/Board'
import Drawer from './components/Drawer'
import type { KanjiDictItem } from './types/KanjiDictItem';

function App() {
  const [text, setText] = useState("");
	const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteKanjis, setFavoriteKanjis] = useState<KanjiDictItem[]>([]);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <header>
        <h1>Kana-Board</h1>
      </header>
      
      <main>
        <Board 
          setFavorites={setFavorites}
          setFavoriteKanjis={setFavoriteKanjis}
          text={text}
          setText={setText}
          textareaRef={textareaRef}
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
  )
}

export default App
