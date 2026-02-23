import XMarkIcon from "./icons/XMarkIcon";

type CopyType = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  inputElementRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  isIconOnly?: boolean;
}

function ClearButton({
  input,
  setInput,
  inputElementRef,
  isIconOnly
} : CopyType) {

  function clearInput() {
		setInput("");
    inputElementRef.current?.focus();
	}

  return (
    <button
      onClick={clearInput}
      type="button"
      className={`button${isIconOnly ? " button--icon-only": ""}`}
      disabled={!input.length ? true : false}
    >
      {!isIconOnly ? "Clear" : ""} 
      <XMarkIcon className="button__icon" />
    </button>
  );
}

export default ClearButton;