import { useState } from 'react';
import './App.css'
import Board from './components/Board'
import Drawer from './components/Drawer'
import type { KanjiDictItem } from './types/KanjiDictItem';

function App() {
	const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteKanjis, setFavoriteKanjis] = useState<KanjiDictItem[]>([]);

  return (
    <>
      <header>
        <h1>Kana-Board</h1>
      </header>
      
      <main>
        <Board 
          setFavorites={setFavorites}
          setFavoriteKanjis={setFavoriteKanjis}
        />
      </main>
      
      <Drawer 
        favorites={favorites}
        setFavorites={setFavorites}
        favoriteKanjis={favoriteKanjis}
        setFavoriteKanjis={setFavoriteKanjis}
      />
    </>
  )
}

export default App
