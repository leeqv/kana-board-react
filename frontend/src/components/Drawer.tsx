import { memo, useState, type MouseEvent } from 'react';
import CopyButton from './buttons/CopyButton';
import ShowDrawerButton from './ShowDrawerButton';
import type { KanjiDictItem } from '../types/KanjiDictItem';
import InsertIcon from './icons/InsertIcon';
import insertToText from '../utils/insertToText';
import FaveButton from './buttons/FaveButton';
import ButtonWithTooltip from './buttons/ButtonWithTooltip';

type DrawerType = {
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  favorites: string[];
  favoriteKanjis: KanjiDictItem[];
  setFavoriteKanjis: React.Dispatch<React.SetStateAction<KanjiDictItem[]>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
};

const Drawer = memo(function Drawer({
  favorites,
  setFavorites,
  favoriteKanjis,
  setFavoriteKanjis,
  setText,
  textareaRef,
}: DrawerType) {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  return (
    <aside className={drawerVisibility ? '' : 'hidden'}>
      <div className="drawer">
        <ShowDrawerButton
          drawerVisibility={drawerVisibility}
          setDrawerVisibility={setDrawerVisibility}
        />

        <div className="drawer__container">
          <section className="drawer__section">
            {favorites.length > 0 && (
              <h3 className="drawer__heading">Phrases</h3>
            )}

            <div>
              {favorites.map((fave, index) => (
                <div key={index} className="fave-card">
                  <div className="fave-card__text">{fave}</div>
                  <div className="fave-card__actions">
                    <ButtonWithTooltip
                      mouseDownHandler={(e: MouseEvent<HTMLButtonElement>) => {
                        if (e.button !== 0) return;
                        insertToText(e, fave, textareaRef, setText);
                      }}
                      type="Insert"
                      Icon={InsertIcon}
                    />
                    <CopyButton text={fave} isIconOnly={true} />
                    <FaveButton<string>
                      value={fave}
                      setFavorites={setFavorites}
                      className="fave-card__fave"
                      isFavorite={true}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {favoriteKanjis.length > 0 && (
            <section className="drawer__section">
              {favoriteKanjis.length > 0 && (
                <h3 className="drawer__heading">Kanji</h3>
              )}

              <div>
                {favoriteKanjis.map((fave) => (
                  <div
                    // key={index}
                    // index is not advisable as key if the array changes ("Keys tell React which array item each component corresponds to, so that it can match them up later." - React docs)
                    key={fave.kanji}
                    className="fave-card"
                  >
                    <div className="fave-card__text">
                      <div className="fave-card__kanji">{fave.kanji}</div>
                      <div className="fave-card__def">{fave.definition}</div>
                    </div>
                    <div className="fave-card__actions">
                      <ButtonWithTooltip
                        mouseDownHandler={(
                          e: MouseEvent<HTMLButtonElement>,
                        ) => {
                          if (e.button !== 0) return;
                          insertToText(e, fave.kanji, textareaRef, setText);
                        }}
                        type="Insert"
                        Icon={InsertIcon}
                      />
                      <CopyButton text={fave.kanji} isIconOnly={true} />
                      <FaveButton<KanjiDictItem>
                        value={fave}
                        setFavorites={setFavoriteKanjis}
                        className="fave-card__fave"
                        isFavorite={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </aside>
  );
});

export default Drawer;
