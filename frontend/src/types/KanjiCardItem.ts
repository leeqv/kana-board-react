export type KanjiCardItem = {
  kanji: string;
  definition: string;
  // kanaCursorRef: React.RefObject<number>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  kanaTextareaRef: React.RefObject<HTMLTextAreaElement | null>;
  showDefinition: boolean;
};
