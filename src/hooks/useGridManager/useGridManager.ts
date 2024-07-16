import { useState } from "react";

export const useGridManager = () => {
  const [xIndex, setXIndex] = useState(0);
  const [yIndex, setYIndex] = useState(0);

  const moveRight = () => {};

  const moveLeft = () => {};

  const moveUp = () => {};

  const moveDown = () => {};

  return { xIndex, yIndex, moveRight, moveLeft, moveUp, moveDown };
};
