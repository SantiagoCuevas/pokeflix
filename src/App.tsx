import "./reset.css";
import "./App.css";
import { ScrollList } from "./components/ScrollList/ScrollList";
import { useGridManager } from "./hooks/useGridManager/useGridManager";
import { useKeys } from "./hooks/useKeys/useKeys";
import { Keys } from "./types/Keys";
import { PokeBanner } from "./components/PokeBanner/PokeBanner";
import { useRef } from "react";

function App() {
  const {
    yIndex,
    xIndex,
    moveRight,
    moveLeft,
    moveUp,
    moveDown,
    setScrollCount,
  } = useGridManager();
  const scrollInProgressRef = useRef(false);
  const arr = [
    { title: "Jason" },
    { title: "Zac" },
    { title: "Bambi" },
    { title: "Kiki" },
    { title: "Dmi" },
    { title: "Jordan" },
    { title: "Giorgos" },
    { title: "Kiara" },
    { title: "Oscar" },
    { title: "Henry" },
    { title: "Jesus" },
  ];
  const lists = [arr, arr, arr, arr, arr];
  useKeys({
    handlers: {
      [Keys.UP]: () => {
        if (scrollInProgressRef.current) {
          return;
        }
        moveUp();
      },
      [Keys.DOWN]: () => {
        if (scrollInProgressRef.current) {
          return;
        }
        moveDown({
          maxIndex: lists.length - 1,
        });
      },
    },
  });

  const scroll = (reverse: boolean = false) => {
    window.scrollBy({
      top: reverse ? -(240 + 20) : 240 + 20,
      behavior: "smooth",
    });
    // throttle keys to avoid bad state
    scrollInProgressRef.current = true;
    setTimeout(() => {
      scrollInProgressRef.current = false;
    }, 350);
  };

  return (
    <>
      <PokeBanner />
      <div className="page-container">
        {lists.map((list, i) => (
          <ScrollList
            key={i}
            list={list}
            focused={i === yIndex}
            xIndex={xIndex}
            yIndex={i}
            itemWidth={350}
            gapSize={20}
            moveRight={moveRight}
            moveLeft={moveLeft}
            setScrollCount={setScrollCount}
            scroll={scroll}
          />
        ))}
        <div style={{ height: 255, width: "100%" }} />
      </div>
    </>
  );
}

export default App;
