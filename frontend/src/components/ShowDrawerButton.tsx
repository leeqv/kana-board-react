import HeartIcon from './icons/HeartIcon';
import XMarkIcon from './icons/XMarkIcon';

type ShowDrawerButtonType = {
  drawerVisibility: boolean;
  setDrawerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

function ShowDrawerButton({
  drawerVisibility,
  setDrawerVisibility,
}: ShowDrawerButtonType) {
  function showDrawer() {
    setDrawerVisibility((v) => !v);
  }

  return (
    <button className="drawer__toggle" onClick={showDrawer} type="button">
      Favorites
      <span className="drawer__toggle-btn-icon">
        {drawerVisibility ? (
          <XMarkIcon className="icon" />
        ) : (
          <HeartIcon className="icon active" />
        )}
      </span>
    </button>
  );
}

export default ShowDrawerButton;
