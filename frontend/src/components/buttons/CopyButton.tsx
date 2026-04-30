import { useState } from 'react';
import CopyIcon from '../icons/CopyIcon';
import CheckIcon from '../icons/CheckIcon';
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
      <CopyIcon className={`${isIconOnly ? ' icon' : 'button__icon'}`} />
    ) : (
      <CheckIcon className={`${isIconOnly ? ' icon' : 'button__icon'}`} />
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
      disabled={!text.length ? true : false}
    >
      {copyButtonText}
      {copyButtonIcon}
    </button>
  );
}

export default CopyButton;
