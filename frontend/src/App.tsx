import { useState } from 'react';
import './App.css'
import Board from './components/Board'
import Drawer from './components/Drawer'

function App() {
	const [favorites, setFavorites] = useState<string[]>([]);

  return (
    <>
      <header>
        <h1>Kana-Board</h1>
      </header>
      
      <main>
        <Board 
          setFavorites={setFavorites}
        />
      </main>
      
      <Drawer 
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </>
  )
}

export default App
