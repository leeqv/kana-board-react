import type { KanjiDictItem } from "./KanjiDictItem";

export type KanjiCardItem = {
  entry: KanjiDictItem;
  // kanaCursorRef: React.RefObject<number>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  kanaTextareaRef: React.RefObject<HTMLTextAreaElement | null>;
  showDefinition: boolean;
  setFavoriteKanjis: React.Dispatch<React.SetStateAction<KanjiDictItem[]>>;
};
