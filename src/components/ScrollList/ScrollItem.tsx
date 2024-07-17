import { useEffect, useRef } from "react";
import { useWindowSize } from "../../hooks/useWindowSize/useWindowSize";

export interface ScrollItemProps {
  title: string;
  yIndex: number;
  focused?: boolean;
  scroll: (reverse: boolean) => void;
}

export const ScrollItem = (props: ScrollItemProps) => {
  const { title, focused = false, yIndex, scroll } = props;
  const ref = useRef<null | HTMLDivElement>(null);
  const scrollStartedRef = useRef(false);
  const { width: windowWidth } = useWindowSize();

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
  }, [focused]);

  return (
    <div ref={ref} className="scroll-item" data-focused={focused}>
      <h1>{title}</h1>
    </div>
  );
};
