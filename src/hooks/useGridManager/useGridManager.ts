import { useState } from "react";

export const useGridManager = () => {
  const [xIndex, setXIndex] = useState(0);
  const [yIndex, setYIndex] = useState(0);

  const moveRight = (maxIndex: number = Infinity) => {
    const nextXIndex = xIndex + 1;
    if (nextXIndex <= maxIndex) {
      setXIndex(nextXIndex);
    }
  };

  const moveLeft = () => {
    const nextXIndex = xIndex - 1;
    if (nextXIndex >= 0) {
      setXIndex(nextXIndex);
    }
  };

  const moveUp = () => {
    const nextYIndex = yIndex - 1;
    if (nextYIndex >= 0) {
      setYIndex(nextYIndex);
    }
  };

  const moveDown = (maxIndex: number = Infinity) => {
    const nextYIndex = yIndex + 1;
    if (nextYIndex <= maxIndex) {
      setYIndex(yIndex + 1);
    }
  };

  return { xIndex, yIndex, moveRight, moveLeft, moveUp, moveDown };
};
