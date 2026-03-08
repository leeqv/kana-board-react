import { useState } from "react";
import CopyIcon from "../icons/CopyIcon";
import CheckIcon from "../icons/CheckIcon";

type CopyType = {
  text: string;
}

function CopyButton({ text } : CopyType) {
  const [copyButtonText, setCopyButtonText] = useState<"Copy" | "Copied!">("Copy");
	const copyButtonIcon = copyButtonText === "Copy" ? <CopyIcon className="button__icon" /> : <CheckIcon className="button__icon" />;
  
  async function writeClipboardText() {		
		try {
			await navigator.clipboard.writeText(text);
			setCopyButtonText("Copied!");
			setTimeout(() => setCopyButtonText("Copy"), 2000);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
			} else {
				console.error("Unknown error", error);
			}
		}
	}

  return (
    <button
      onClick={writeClipboardText}
      type="button"
      className="button"
      disabled={!text.length ? true : false}
    >
      {copyButtonText} 
      {copyButtonIcon}
    </button>
  );
}

export default CopyButton;