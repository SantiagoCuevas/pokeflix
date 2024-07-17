import "./PokemonCard.css";
import { Pokemon } from "../../types/Pokemon";
import pokeLoader from "../../assets/pokeloader.gif";
import { useEffect, useMemo, useRef } from "react";
import { useKeys } from "../../hooks/useKeys/useKeys";
import { Keys } from "../../types/Keys";
import { useObserver } from "../../hooks/useObserver/useObserver";

interface PokemonCardProps {
  title: string;
  focused?: boolean;
  pk: any;
  setActivePokemon: (pk: Pokemon) => void;
  scroll: (reverse: boolean) => void;
  ttsEnabled?: boolean;
}

export const PokemonCard = (props: PokemonCardProps) => {
  const {
    title,
    focused = false,
    scroll,
    setActivePokemon,
    pk,
    ttsEnabled = false,
  } = props;
  const scrollStartedRef = useRef(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const keyHandlers = useMemo(
    () => ({
      handlers: {
        [Keys.ENTER]: () => {
          if (!pk || !focused) {
            return;
          }

          const cryAudioFile = pk.cries.latest;
          if (!cryAudioFile) {
            return;
          }
          const audio = new Audio(cryAudioFile);
          audio.play();
        },
      },
    }),
    [focused, pk]
  );

  useKeys(keyHandlers);
  const entryRef = useObserver({
    focused,
    scrollParent: scroll,
    isVertical: false,
  });

  useEffect(() => {
    scrollStartedRef.current = false;

    if (focused && pk) {
      setActivePokemon(pk);

      if (ttsEnabled) {
        const msg = new SpeechSynthesisUtterance();
        msg.text = pk.name;
        window.speechSynthesis.speak(msg);
      }
    }
  }, [focused, pk, setActivePokemon, ttsEnabled]);

  return (
    <div ref={entryRef} className="pokemon-card" data-focused={focused}>
      <img
        src={pokeLoader}
        className="pokemon-card-image"
        ref={imgRef}
        onLoad={() => {
          if (!imgRef.current) {
            return;
          }
          // show pokeball loader while waiting for real images
          if (imgRef.current.src !== pk.sprites.front_default) {
            imgRef.current.src = pk.sprites.front_default;
          }
        }}
      />
      <h2>{title?.toUpperCase()}</h2>
    </div>
  );
};
