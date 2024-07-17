import { useRef, useState } from "react";
import { WrapBehavior } from "../../types/WrapBehavior";

export interface NavigationOptions {
  maxIndex?: number;
  wrapBehavior?: WrapBehavior;
}

type VerticalNavOptions = Omit<NavigationOptions, "wrapBehavior">;

type ScrollCache = { [key: number]: number | undefined };

export const useGridManager = () => {
  const [xIndex, setXIndex] = useState(0);
  const [yIndex, setYIndex] = useState(0);
  const scrollCacheRef = useRef<ScrollCache>({});

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
      const fromScrollCount = scrollCacheRef.current[yIndex] || 0;
      const toScrollCount = scrollCacheRef.current[nextYIndex] || 0;

      setXIndex(xIndex - fromScrollCount + toScrollCount);
    }
  };

  const moveDown = (navOptions: VerticalNavOptions = {}) => {
    const { maxIndex = Infinity } = navOptions;
    const nextYIndex = yIndex + 1;
    if (nextYIndex <= maxIndex) {
      setYIndex(yIndex + 1);
      const fromScrollCount = scrollCacheRef.current[yIndex] || 0;
      const toScrollCount = scrollCacheRef.current[nextYIndex] || 0;
      const result = xIndex - fromScrollCount + toScrollCount;
      setXIndex(result);
    }
  };

  const setScrollCount = (targetYIndex: number, scrollCount: number) => {
    scrollCacheRef.current[targetYIndex] = scrollCount;
  };

  return {
    xIndex,
    yIndex,
    moveRight,
    moveLeft,
    moveUp,
    moveDown,
    setScrollCount,
  };
};
