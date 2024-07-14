import { useCallback, useEffect, useState } from "react";
import { ScrollItem } from "./ScrollItem";
import "./ScrollList.css";
import { Keys } from "../../types/Keys";

interface ScrollListProps {
  list: { title: string }[];
  circular?: boolean;
}

const incMap: { [key: number]: number | undefined } = {
  [Keys.LEFT]: -1,
  [Keys.RIGHT]: 1,
};

export const ScrollList = (props: ScrollListProps) => {
  const { list, circular = false } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const inc = incMap[e.keyCode];
      if (inc === undefined) {
        return;
      }

      const result = activeIndex + inc;
      const newIndex = circular
        ? ((result % list.length) + list.length) % list.length
        : activeIndex;

      setActiveIndex(newIndex);
    },
    [activeIndex, list.length, circular]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="scroll-list">
      {list.map((item, i) => (
        <ScrollItem
          key={item.title}
          title={item.title}
          focused={activeIndex === i}
        />
      ))}
    </div>
  );
};
