import XMarkIcon from "../icons/XMarkIcon";
import ButtonWithTooltip from "./ButtonWithTooltip";

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

  return (
    <ButtonWithTooltip
      clickHandler={clearInput}
      
      className={className}
      type="Clear"
      Icon={XMarkIcon}
    />
  );
}

export default ClearButton;