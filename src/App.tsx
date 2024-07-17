import "./App.css";
import { ScrollList } from "./components/ScrollList/ScrollList";
import { useGridManager } from "./hooks/useGridManager/useGridManager";
import { useKeys } from "./hooks/useKeys/useKeys";
import { Keys } from "./types/Keys";

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
  const lists = [arr, arr];
  useKeys({
    handlers: {
      [Keys.UP]: () => {
        moveUp();
      },
      [Keys.DOWN]: () => {
        moveDown({
          maxIndex: lists.length - 1,
        });
      },
    },
  });
  return (
    <>
      <div>
        {lists.map((list, i) => (
          <ScrollList
            key={i}
            list={list}
            focused={i === yIndex}
            xIndex={xIndex}
            yIndex={i}
            itemWidth={215}
            gapSize={20}
            moveRight={moveRight}
            moveLeft={moveLeft}
            setScrollCount={setScrollCount}
          />
        ))}
      </div>
    </>
  );
}

export default App;
