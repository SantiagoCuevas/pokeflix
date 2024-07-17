import { ScrollItem } from "./ScrollItem";
import "./ScrollList.css";
import { Keys } from "../../types/Keys";
import { NavigationOptions } from "../../hooks/useGridManager/useGridManager";
import { useKeys } from "../../hooks/useKeys/useKeys";
import { useRef } from "react";

interface ScrollListProps {
  list: { title: string }[];
  xIndex: number;
  yIndex: number;
  itemWidth: number;
  gapSize: number;
  moveRight: (navOptions: NavigationOptions) => void;
  moveLeft: (navOptions: NavigationOptions) => void;
  setScrollCount: (targetIndex: number, count: number) => void;
  focused?: boolean;
  circular?: boolean;
}

export const ScrollList = (props: ScrollListProps) => {
  const {
    list,
    focused = false,
    xIndex,
    yIndex,
    itemWidth,
    gapSize,
    moveRight,
    moveLeft,
    setScrollCount,
  } = props;
  const scrollCountRef = useRef(0);
  const scrollDivRef = useRef<null | HTMLDivElement>(null);
  const scrollInProgressRef = useRef(false);

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
    }, 200);
  };

  return (
    <div className="scroll-list" ref={scrollDivRef}>
      {list.map((item, i) => (
        <ScrollItem
          scroll={scroll}
          key={`${yIndex}-${item.title}`}
          title={item.title}
          focused={focused && xIndex === i}
          yIndex={yIndex}
        />
      ))}
      <div style={{ minWidth: 100, height: 200 }} />
    </div>
  );
};
