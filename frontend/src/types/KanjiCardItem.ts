import type { KanjiDictItem } from "./KanjiDictItem";

export type KanjiCardItem = {
  entry: KanjiDictItem;
  setText: React.Dispatch<React.SetStateAction<string>>;
  kanaTextareaRef: React.RefObject<HTMLTextAreaElement | null>;
  showDefinition: boolean;
  favoriteKanjis: KanjiDictItem[];
  setFavoriteKanjis: React.Dispatch<React.SetStateAction<KanjiDictItem[]>>;
};
