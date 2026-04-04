import CopyButton from "./buttons/CopyButton";
import XMarkIcon from "./icons/XMarkIcon";

type DrawerType = {
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
	favorites: string[];
}

function Drawer({
  favorites,
  setFavorites,
} : DrawerType) {
  // function hideDrawer() {
  //   setDrawerVisibility(false);
  // }

  function handleDelete(fave: string) {
    setFavorites(oldFaves => oldFaves.filter(el => el !== fave));
  }

  return (
    <div className="drawer">
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
  )
}

export default Drawer;