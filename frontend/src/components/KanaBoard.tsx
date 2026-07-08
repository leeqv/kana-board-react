import transliterate from '../utils/transliterate';
import ClearButton from './buttons/ClearButton';
import CopyButton from './buttons/CopyButton';
import FaveButton from './buttons/FaveButton';
import { useText } from '../contexts/useText';
import { useTextareaRef } from '../contexts/useTextareaRef';
import { useFavorites } from '../contexts/useFavorites';

function KanaBoard() {
  const textareaRef = useTextareaRef();
  const { text, setText } = useText();
  const { favorites, setFavorites } = useFavorites();

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    transliterate(e, textareaRef, setText);
  }

  function handleTextareaBlur() {
    textareaRef.current?.setSelectionRange(text.length, text.length);
  }

  return (
    <div className="board">
      <div className="board__box">
        <textarea
          value={text}
          onChange={handleTextareaChange}
          ref={textareaRef}
          autoFocus
          onBlur={handleTextareaBlur}
          className="board__textarea"
          placeholder="lowercase ➡ ひらがな&#10;UPPERCASE ➡ カタカナ"
        />
        {text.length > 0 && (
          <ClearButton
            setInput={setText}
            inputElementRef={textareaRef}
            className="btn-icon board__button board__button--clear"
          />
        )}
        {text.length > 0 && (
          <FaveButton<string>
            value={text}
            setFavorites={setFavorites}
            disabled={!text.length}
            className="btn-icon board__button board__button--fave"
            isFavorite={favorites.some((item) => item === text)}
          />
        )}
      </div>
      <div className="button-group board__actions">
        <CopyButton text={text} />
      </div>
    </div>
  );
}

export default KanaBoard;
