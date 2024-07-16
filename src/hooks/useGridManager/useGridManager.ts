import { useState } from "react";
import { WrapBehavior } from "../../types/WrapBehavior";

interface NavigationOptions {
  maxIndex?: number;
  wrapBehavior?: WrapBehavior;
}

type VerticalNavOptions = Omit<NavigationOptions, "wrapBehavior">;

export const useGridManager = () => {
  const [xIndex, setXIndex] = useState(0);
  const [yIndex, setYIndex] = useState(0);

  const moveRight = (navOptions: NavigationOptions = {}) => {
    const { maxIndex = Infinity, wrapBehavior = WrapBehavior.NONE } =
      navOptions;

    const nextXIndex = xIndex + 1;

    if (wrapBehavior === WrapBehavior.LOOP && nextXIndex > maxIndex) {
      setXIndex(0);
      return;
    }

    if (nextXIndex <= maxIndex) {
      setXIndex(nextXIndex);
    }
  };

  const moveLeft = (navOptions: NavigationOptions = {}) => {
    const { maxIndex, wrapBehavior = WrapBehavior.NONE } = navOptions;
    const nextXIndex = xIndex - 1;

    if (wrapBehavior === WrapBehavior.LOOP && nextXIndex < 0 && maxIndex) {
      setXIndex(maxIndex);
      return;
    }

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

  const moveDown = (navOptions: VerticalNavOptions = {}) => {
    const { maxIndex = Infinity } = navOptions;
    const nextYIndex = yIndex + 1;
    if (nextYIndex <= maxIndex) {
      setYIndex(yIndex + 1);
    }
  };

  return { xIndex, yIndex, moveRight, moveLeft, moveUp, moveDown };
};
