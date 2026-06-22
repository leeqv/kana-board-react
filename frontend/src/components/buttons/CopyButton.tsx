import { useState } from 'react';
import CopyIcon from '../icons/CopyIcon';
import ButtonWithTooltip from './ButtonWithTooltip';

type CopyType = {
  text: string;
  isIconOnly?: boolean;
};

function CopyButton({ text, isIconOnly }: CopyType) {
  const [copyButtonText, setCopyButtonText] = useState<'Copy' | 'Copied!'>(
    'Copy',
  );
  const copyButtonIcon =
    copyButtonText === 'Copy' ? (
      <CopyIcon className={`${isIconOnly ? 'icon' : 'button__icon'}`} />
    ) : (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="button__icon"
      >
        <path
          d="M4 12.6111L8.92308 17.5L20 6.5"
          stroke="#fff"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

  async function writeClipboardText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error', error);
      }
    }
  }

  return isIconOnly ? (
    <ButtonWithTooltip
      clickHandler={writeClipboardText}
      type="Copy"
      Icon={CopyIcon}
    />
  ) : (
    <button
      onClick={writeClipboardText}
      type="button"
      className="button"
      disabled={!text.length}
    >
      {copyButtonText}
      {copyButtonIcon}
    </button>
  );
}

export default CopyButton;
