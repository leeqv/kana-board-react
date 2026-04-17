import { useState } from "react";
import HeartIcon from "../icons/HeartIcon";
import CheckIcon from "../icons/CheckIcon";

type FaveType<ValueType> = {
  value: ValueType;
  setFavorites: React.Dispatch<React.SetStateAction<ValueType[]>>;
  disabled: boolean;
  className?: string;
  hideCheck?: boolean;
}

function FaveButton<T>({ 
  value,
  setFavorites,
  disabled,
  className,
  hideCheck,
} : FaveType<T>) {
  const [faveButtonText, setfaveButtonText] = useState<"Save" | "Saved!">("Save");
	const faveButtonIcon = faveButtonText === "Save" ? <HeartIcon className="icon" /> : <CheckIcon className="icon" />;
  
  function addToFavorites() {
		setFavorites((faves) => {
			if (!faves.includes(value)) {
				return [...faves, value];
			} else {
				return faves;
			}
		})
		setfaveButtonText("Saved!");
		setTimeout(() => setfaveButtonText("Save"), 2000);
	}

  return (
    <button
      onClick={addToFavorites}
      type="button"
      className={`btn-icon${className ? ' ' + className : ''}`}
      disabled={disabled}
    >
      {hideCheck ? <HeartIcon className="icon" /> : faveButtonIcon}
    </button>
  );
}

export default FaveButton;