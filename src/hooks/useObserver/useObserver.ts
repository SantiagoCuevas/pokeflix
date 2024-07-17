import { useEffect, useRef } from "react";
import { useWindowSize } from "../useWindowSize/useWindowSize";

interface UseObserverProps {
  focused: boolean;
  scrollParent: (reverse: boolean) => void;
  isVertical?: boolean;
}

export const useObserver = (props: UseObserverProps) => {
  const { focused, scrollParent, isVertical = false } = props;
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const startedScrollRef = useRef(false);
  const entryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!focused) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isOverEdge = !entry.isIntersecting;

          if (startedScrollRef.current || !isOverEdge) {
            return;
          }

          const { boundingClientRect } = entry;
          const entryEdge = isVertical
            ? boundingClientRect.bottom
            : boundingClientRect.right;
          const threshold = isVertical ? windowHeight : windowWidth;
          const isOverPositiveEdge = entryEdge > threshold;

          scrollParent(!isOverPositiveEdge);
          startedScrollRef.current = true;
        });
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (entryRef.current) {
      observer.observe(entryRef.current);
    }

    return () => {
      if (entryRef.current) {
        observer.unobserve(entryRef.current);
      }
    };
  }, [
    entryRef,
    focused,
    isVertical,
    scrollParent,
    startedScrollRef,
    windowHeight,
    windowWidth,
  ]);

  useEffect(() => {
    startedScrollRef.current = false;
  }, [focused]);

  return entryRef;
};
