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
      className="drawer__toggle"
      onClick={showDrawer}
      type="button"
      >
      <span 
        className={`drawer__toggle-btn-icon btn-icon ${className}`}
      >
        { drawerVisibility 
          ? <XMarkIcon className="icon" />
          : <HeartIcon className="icon" />
        }
      </span>
      Favorites
    </button>
  );
}

export default ShowDrawerButton;