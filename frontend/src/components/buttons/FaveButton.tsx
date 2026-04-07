// import { useState } from "react";
// import FaveIcon from "../icons/FaveIcon";
// import CheckIcon from "../icons/CheckIcon";

import { useState } from "react";
import HeartIcon from "../icons/HeartIcon";
import CheckIcon from "../icons/CheckIcon";

type FaveType<ValueType> = {
  value: ValueType;
  setFavorites: React.Dispatch<React.SetStateAction<ValueType[]>>;
  disabled: boolean;
  isIconOnly?: boolean;
  className?: string;
}

function FaveButton<T>({ 
  value,
  setFavorites,
  disabled,
  isIconOnly,
  className,
} : FaveType<T>) {
  const [faveButtonText, setfaveButtonText] = useState<"Save" | "Saved!">("Save");
	const faveButtonIcon = faveButtonText === "Save" ? <HeartIcon className="button__icon" /> : <CheckIcon className="button__icon" />;
  
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
      className={`button ${isIconOnly && 'button--small'} ${className}`}
      disabled={disabled}
    >
      {!isIconOnly && faveButtonText}
      {faveButtonIcon}
    </button>
  );
}

export default FaveButton;