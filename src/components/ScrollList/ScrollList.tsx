import { ScrollItem } from "./ScrollItem";
import "./ScrollList.css";
import { Keys } from "../../types/Keys";
import { NavigationOptions } from "../../hooks/useGridManager/useGridManager";
import { useKeys } from "../../hooks/useKeys/useKeys";
import { useEffect, useRef } from "react";
import { useWindowSize } from "../../hooks/useWindowSize/useWindowSize";

interface ScrollListProps {
  list: { title: string }[];
  xIndex: number;
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
    xIndex,
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
  const scrollDivRef = useRef<null | HTMLDivElement>(null);
  const scrollInProgressRef = useRef(false);
  const scrollStartedRef = useRef(false);
  const { height: windowHeight } = useWindowSize();

  useKeys({
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
  });

  useEffect(() => {
    if (focused) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && focused) {
              const { boundingClientRect } = entry;
              if (boundingClientRect.bottom > windowHeight) {
                if (!scrollStartedRef.current) {
                  scrollParent(false);
                }
              } else if (focused) {
                if (!scrollStartedRef.current) {
                  scrollParent(true);
                }
              }
              scrollStartedRef.current = true;
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 1.0 }
      );

      if (scrollDivRef.current) {
        observer.observe(scrollDivRef.current);
      }

      return () => {
        if (scrollDivRef.current) {
          observer.unobserve(scrollDivRef.current);
        }
      };
    }
  }, [focused, scrollParent, windowHeight, yIndex]);

  const scroll = (reverse: boolean = false) => {
    if (!scrollDivRef.current) {
      return;
    }

    const div = scrollDivRef.current;
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
  };

  useEffect(() => {
    scrollStartedRef.current = false;
  }, [focused]);

  return (
    <>
      <div className="scroll-list" ref={scrollDivRef}>
        {list.map((item: any, i) => (
          <ScrollItem
            scroll={scroll}
            key={`gen-${yIndex}-${item?.name}`}
            title={item?.name ? item.name : "not working"}
            focused={focused && xIndex === i}
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
