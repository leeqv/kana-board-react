import HeartIcon from '../icons/HeartIcon';
import ButtonWithTooltip from './ButtonWithTooltip';

type FaveType<ValueType> = {
  value: ValueType;
  setFavorites: React.Dispatch<React.SetStateAction<ValueType[]>>;
  // value: string | KanjiDictItem;
  // setFavorites: React.Dispatch<React.SetStateAction<(string | KanjiDictItem)[]>>;
  disabled?: boolean;
  className?: string;
  isFavorite?: boolean;
  isEqual?: (a: ValueType, b: ValueType) => boolean;
};
// Used generics to make sure types of value and setFavorites are matched with each other.
// If used union type (string | KanjiDictItem), mismatched types would be allowed: value: string, setFavorites: KanjiDictItem.

function FaveButton<T>({
  value,
  setFavorites,
  disabled,
  className,
  isFavorite,
  isEqual,
}: FaveType<T>) {
  const compare = isEqual ?? ((a, b) => a === b);

  function setter() {
    setFavorites((faves) => {
      // Array.includes and filter use strict equality, which compares objects by reference (not by contents).
      // kanjiFavorites is from localStorage, value is from the Jisho API
      // Though same Object { kanji: "赤", definition: "red" }, they are different object instances
      
      // if (!faves.includes(value)) {
      if (!isFavorite) {
        return [...faves, value];
      } else {
        // return faves.filter((f) => f !== value);
        // So kanjiFavorites need a custom compare function by key (kanji)
        return faves.filter((f) => !compare(f, value));
      }
    });
  }

  return (
    <ButtonWithTooltip
      clickHandler={setter}
      disabled={disabled}
      className={className}
      isFavorite={isFavorite}
      type="Favorites"
      Icon={HeartIcon}
    />
  );
}

export default FaveButton;