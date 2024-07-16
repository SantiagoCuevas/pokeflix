import { renderHook } from "@testing-library/react";
import { useGridManager } from "../useGridManager";

describe("useGridManager", () => {
  describe("return values", () => {
    it("returns xIndex 0 by default", () => {
      const { result } = renderHook(() => useGridManager());

      const { xIndex } = result.current;

      expect(xIndex).toBe(0);
    });

    it("returns yIndex 0 by default", () => {
      const { result } = renderHook(() => useGridManager());

      const { yIndex } = result.current;

      expect(yIndex).toBe(0);
    });

    it("returns a move right callback", () => {
      const { result } = renderHook(() => useGridManager());

      const { moveRight } = result.current;

      expect(typeof moveRight).toBe("function");
    });

    it("returns a move left callback", () => {
      const { result } = renderHook(() => useGridManager());

      const { moveLeft } = result.current;

      expect(typeof moveLeft).toBe("function");
    });

    it("returns a move up callback", () => {
      const { result } = renderHook(() => useGridManager());

      const { moveUp } = result.current;

      expect(typeof moveUp).toBe("function");
    });

    it("returns a move down callback", () => {
      const { result } = renderHook(() => useGridManager());

      const { moveDown } = result.current;

      expect(typeof moveDown).toBe("function");
    });
  });
});
