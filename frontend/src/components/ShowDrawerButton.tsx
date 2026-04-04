import HeartIcon from "./icons/HeartIcon";
import XMarkIcon from "./icons/XMarkIcon";

type ShowDrawerButtonType = {
  drawerVisibility: boolean;
	setDrawerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

function ShowDrawerButton({
  drawerVisibility,
  setDrawerVisibility,
  className,
}: ShowDrawerButtonType ) {

  function showDrawer() {
    setDrawerVisibility(v => !v);
  }

  return (
    <button 
      className="drawer-toggle"
      onClick={showDrawer}
      >
      <div 
        className={`header__button ${className}`}
      >
        { drawerVisibility 
          ? <XMarkIcon className="button__icon" />
          : <HeartIcon className="button__icon" />
        }
      </div>
      Favorites
    </button>
  );
}

export default ShowDrawerButton;