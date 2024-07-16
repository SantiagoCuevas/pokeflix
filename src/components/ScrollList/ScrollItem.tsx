import { useEffect, useRef } from "react";

export interface ScrollItemProps {
  title: string;
  focused?: boolean;
}

export const ScrollItem = (props: ScrollItemProps) => {
  const { title, focused = false } = props;
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (focused) {
      ref.current?.scrollIntoView();
    }
  }, [focused]);

  return (
    <div ref={ref} className="scroll-item" data-focused={focused}>
      <h1>{title}</h1>
    </div>
  );
};
