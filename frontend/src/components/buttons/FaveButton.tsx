import HeartIcon from "../icons/HeartIcon";
import ButtonWithTooltip from "./ButtonWithTooltip";

type FaveType<ValueType> = {
  value: ValueType;
  setFavorites: React.Dispatch<React.SetStateAction<ValueType[]>>;
  disabled?: boolean;
  className?: string;
  isFavorite?: boolean;
}

function FaveButton<T>({ 
  value,
  setFavorites,
  disabled,
  className,
  isFavorite,
} : FaveType<T>) {
  function setter() {
    setFavorites((faves) => {
			if (!faves.includes(value)) {
				return [...faves, value];
			} else {
				return faves.filter(f => f !== value);
			}
		})
  }

  return (
    <ButtonWithTooltip
      clickHandler={setter}
      disabled={disabled}
      className={className}
      isFavorite={isFavorite}
      type="Favorites"
      Icon={HeartIcon}
    />
  );
}

export default FaveButton;