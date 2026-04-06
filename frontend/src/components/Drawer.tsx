import { useState } from "react";
import CopyButton from "./buttons/CopyButton";
import XMarkIcon from "./icons/XMarkIcon";
import ShowDrawerButton from "./ShowDrawerButton";

type DrawerType = {
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
	favorites: string[];
}

function Drawer({
  favorites,
  setFavorites,
} : DrawerType) {
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  
  function handleDelete(fave: string) {
    setFavorites(oldFaves => oldFaves.filter(el => el !== fave));
  }

  return (
    <aside className={drawerVisibility ? '' : 'hidden'} >
      <div className="drawer">
        <ShowDrawerButton
          drawerVisibility={drawerVisibility}
          setDrawerVisibility={setDrawerVisibility}
          />

        <div>
          {favorites.length === 0 && (<p>Nothing to see here yet.</p>)}
          {favorites.map((fave, index) => (
            <div 
              key={index}
              className="fave-card"
              // onClick={hideDrawer}
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
      </div>
    </aside>
  )
}

export default Drawer;