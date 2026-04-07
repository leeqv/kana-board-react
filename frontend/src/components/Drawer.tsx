import { useState } from "react";
import CopyButton from "./buttons/CopyButton";
import XMarkIcon from "./icons/XMarkIcon";
import ShowDrawerButton from "./ShowDrawerButton";
import type { KanjiDictItem } from "../types/KanjiDictItem";

type DrawerType = {
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
	favorites: string[];
  favoriteKanjis: KanjiDictItem[];
  setFavoriteKanjis: React.Dispatch<React.SetStateAction<KanjiDictItem[]>>;
}

function Drawer({
  favorites,
  setFavorites,
  favoriteKanjis,
  setFavoriteKanjis,
} : DrawerType) {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  
  function handleDelete(fave: string) {
    setFavorites(oldFaves => oldFaves.filter(el => el !== fave));
  }

  function handleDeleteKanji(fave: KanjiDictItem) {
    setFavoriteKanjis(oldFaves => oldFaves.filter(el => el.kanji !== fave.kanji));
  }

  return (
    <aside className={drawerVisibility ? '' : 'hidden'} >
      <div className="drawer">
        <ShowDrawerButton
          drawerVisibility={drawerVisibility}
          setDrawerVisibility={setDrawerVisibility}
          />

        <section className="drawer__section">
          {favorites.length > 0 && (<h3 className="drawer__heading">Phrases</h3>)}

          <div>
            {favorites.map((fave, index) => (
              <div 
                key={index}
                className="fave-card"
              >
                <div className="fave-card__text">
                  {fave}
                </div>
                <CopyButton text={fave} isIconOnly={true}/>
                <button 
                  className="button button--small"
                  onClick={() => handleDelete(fave)}
                  >
                  <XMarkIcon className="button__icon"/>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="drawer__section">
          {favoriteKanjis.length > 0 && (<h3 className="drawer__heading">Kanji</h3>)}

          <div>
            {favoriteKanjis.map((fave, index) => (
              <div 
                key={index}
                className="fave-card"
              >
                <div className="fave-card__text">
                  <div className="fave-card__kanji">{fave.kanji}</div>
                  <div className="fave-card__def">{fave.definition}</div>
                </div>
                <CopyButton text={fave.kanji} isIconOnly={true}/>
                <button 
                  className="button button--small"
                  onClick={() => handleDeleteKanji(fave)}
                  >
                  <XMarkIcon className="button__icon"/>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}

export default Drawer;