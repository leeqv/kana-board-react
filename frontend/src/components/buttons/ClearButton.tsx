import { useRef, useState } from "react";
import XMarkIcon from "../icons/XMarkIcon";

type ClearButtonType = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  inputElementRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  className?: string;
}

function ClearButton({
  setInput,
  inputElementRef,
  className,
} : ClearButtonType) {

  function clearInput() {
		setInput("");
    inputElementRef.current?.focus();
	}

  const [show, setShow] = useState(false);
  const timerRef = useRef<number | null>(null);

  function showTooltip() {
    timerRef.current = setTimeout(() => {
      setShow(true);
    }, 1000);
  }

  function hideTooltip() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShow(false);
  }
  

  return (
    <button
      onClick={clearInput}
      type="button"
      className={`${className ? className : ''}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <XMarkIcon className="icon" />
      <span className={`btn-icon__tooltip ${!!show && 'show'}`}>
        Clear text
      </span>
    </button>
  );
}

export default ClearButton;