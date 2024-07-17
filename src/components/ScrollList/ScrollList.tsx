import { ScrollItem } from "./ScrollItem";
import "./ScrollList.css";
import { Keys } from "../../types/Keys";
import { NavigationOptions } from "../../hooks/useGridManager/useGridManager";
import { useKeys } from "../../hooks/useKeys/useKeys";
import { useCallback, useMemo, useRef } from "react";
import { Pokemon } from "../../types/Pokemon";
import { useObserver } from "../../hooks/useObserver/useObserver";
import { PokemonCard } from "../PokemonCard/PokemonCard";

interface ScrollListProps {
  list: Pokemon[];
  activeXIndex: number;
  yIndex: number;
  itemWidth: number;
  gapSize: number;
  moveRight: (navOptions: NavigationOptions) => void;
  moveLeft: (navOptions: NavigationOptions) => void;
  setScrollCount: (targetIndex: number, count: number) => void;
  scroll: (reverse: boolean) => void;
  setActivePokemon: (pk: any) => void;
  focused?: boolean;
  circular?: boolean;
  ttsEnabled?: boolean;
}

export const ScrollList = (props: ScrollListProps) => {
  const {
    list,
    focused = false,
    activeXIndex,
    yIndex,
    itemWidth,
    gapSize,
    scroll: scrollParent,
    moveRight,
    moveLeft,
    setScrollCount,
    setActivePokemon,
    ttsEnabled = false,
  } = props;
  const scrollCountRef = useRef(0);
  const scrollInProgressRef = useRef(false);

  const keyHandlers = useMemo(
    () => ({
      handlers: {
        [Keys.LEFT]: () => {
          if (!focused || scrollInProgressRef.current) {
            return;
          }

          if (scrollInProgressRef.current) {
            return;
          }
          moveLeft({
            maxIndex: list.length - 1,
          });
        },
        [Keys.RIGHT]: () => {
          if (!focused || scrollInProgressRef.current) {
            return;
          }

          moveRight({
            maxIndex: list.length - 1,
          });
        },
      },
    }),
    [focused, list.length, moveLeft, moveRight]
  );

  useKeys(keyHandlers);
  const entryRef = useObserver({
    focused,
    scrollParent,
    isVertical: true,
  });

  const scroll = useCallback(
    (reverse: boolean = false) => {
      if (!entryRef.current) {
        return;
      }

      const div = entryRef.current;
      const newCount = scrollCountRef.current + (reverse ? -1 : 1);

      if (newCount >= 0 && newCount < list.length) {
        scrollCountRef.current = newCount;
        setScrollCount(yIndex, newCount);
      }

      div.scrollBy({
        left: reverse ? -(itemWidth + gapSize) : itemWidth + gapSize,
      });
      // throttle keys to avoid bad state
      scrollInProgressRef.current = true;
      setTimeout(() => {
        scrollInProgressRef.current = false;
      }, 400);
    },
    [entryRef, gapSize, itemWidth, list.length, setScrollCount, yIndex]
  );

  return (
    <>
      <div className="scroll-list" ref={entryRef}>
        {list.map((item, i) => (
          <PokemonCard
            scroll={scroll}
            key={item.id}
            title={item?.name ? item.name : "not working"}
            focused={focused && activeXIndex === i}
            yIndex={yIndex}
            pk={list[i]}
            setActivePokemon={setActivePokemon}
            ttsEnabled={ttsEnabled}
          />
        ))}
        <div style={{ minWidth: 100, height: 200 }} />
      </div>
    </>
  );
};
