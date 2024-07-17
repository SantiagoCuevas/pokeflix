import { useEffect, useMemo, useRef } from "react";
import { useWindowSize } from "../../hooks/useWindowSize/useWindowSize";
import { useKeys } from "../../hooks/useKeys/useKeys";
import { Keys } from "../../types/Keys";

export interface ScrollItemProps {
  title: string;
  yIndex: number;
  focused?: boolean;
  pk: any;
  setActivePokemon: (pk: any) => void;
  scroll: (reverse: boolean) => void;
  ttsEnabled?: boolean;
}

export const ScrollItem = (props: ScrollItemProps) => {
  const {
    title,
    focused = false,
    yIndex,
    scroll,
    setActivePokemon,
    pk,
    ttsEnabled = false,
  } = props;
  const ref = useRef<null | HTMLDivElement>(null);
  const scrollStartedRef = useRef(false);
  const { width: windowWidth } = useWindowSize();

  const keyHandlers = useMemo(
    () => ({
      handlers: {
        [Keys.ENTER]: () => {
          if (!pk || !focused) {
            return;
          }

          const cryAudioFile = pk.cries.latest;
          console.log(cryAudioFile);
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

  useEffect(() => {
    if (focused) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && focused) {
              const { boundingClientRect } = entry;
              if (boundingClientRect.right > windowWidth) {
                if (!scrollStartedRef.current) {
                  scroll(false);
                }
              } else if (focused) {
                if (!scrollStartedRef.current) {
                  scroll(true);
                }
              }
              scrollStartedRef.current = true;
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 1.0 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, [focused, scroll, windowWidth, yIndex]);

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
    <div ref={ref} className="scroll-item" data-focused={focused}>
      <h1>{title?.toUpperCase()}</h1>
    </div>
  );
};
