import { useState } from 'react';
import './App.css'
import Board from './components/Board'
import Drawer from './components/Drawer'
import ShowDrawerButton from './components/ShowDrawerButton';

function App() {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
	const [favorites, setFavorites] = useState<string[]>([]);

  return (
    <>
      <header>
        <h1>Kana-Board</h1>
        <ShowDrawerButton
          drawerVisibility={drawerVisibility}
          setDrawerVisibility={setDrawerVisibility}
        />
      </header>
      
      <main>
        <Board 
          setFavorites={setFavorites}
        />
      </main>
      
      <aside
        className={drawerVisibility ? '' : 'hidden'}
      >
        <Drawer 
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </aside>
    </>
  )
}

export default App
