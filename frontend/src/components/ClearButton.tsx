import XMarkIcon from "./icons/XMarkIcon";

type CopyType = {
  setInput: React.Dispatch<React.SetStateAction<string>>;
  inputElementRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  className?: string;
}
function ClearButton({
  setInput,
  inputElementRef,
  className,
} : CopyType) {

  function clearInput() {
		setInput("");
    inputElementRef.current?.focus();
	}

  return (
    <button
      onClick={clearInput}
      type="button"
      className={`button button--icon-only ${className}`}
    >
      <XMarkIcon className="button__icon" />
    </button>
  );
}

export default ClearButton;