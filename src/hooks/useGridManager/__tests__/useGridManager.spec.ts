import { act, renderHook } from "@testing-library/react";
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

  describe("navigation", () => {
    describe("moveRight", () => {
      it("increments the x index by 1", () => {
        const { result } = renderHook(() => useGridManager());

        act(() => {
          result.current.moveRight();
        });

        expect(result.current.xIndex).toBe(1);
      });

      it("does not allow increments past a max value", () => {
        const { result } = renderHook(() => useGridManager());
        const maxIndex = 1;

        act(() => {
          result.current.moveRight(maxIndex);
        });

        act(() => {
          result.current.moveRight(maxIndex);
        });

        act(() => {
          result.current.moveRight(maxIndex);
        });

        expect(result.current.xIndex).toBe(maxIndex);
      });
    });

    describe("moveLeft", () => {
      it("decrements the x index by 1", () => {
        const { result } = renderHook(() => useGridManager());

        act(() => {
          result.current.moveRight();
        });

        act(() => {
          result.current.moveRight();
        });

        act(() => {
          result.current.moveLeft();
        });

        expect(result.current.xIndex).toBe(1);
      });

      it("does not allow decrements into the negative", () => {
        const { result } = renderHook(() => useGridManager());

        act(() => {
          result.current.moveLeft();
        });

        expect(result.current.xIndex).toBe(0);
      });
    });

    describe("moveDown", () => {
      it("increments the y index by 1", () => {
        const { result } = renderHook(() => useGridManager());

        act(() => {
          result.current.moveDown();
        });

        expect(result.current.yIndex).toBe(1);
      });

      it("does not allow increments past a maxIndex", () => {
        const { result } = renderHook(() => useGridManager());
        const maxIndex = 1;

        act(() => {
          result.current.moveDown(maxIndex);
        });

        act(() => {
          result.current.moveDown(maxIndex);
        });

        act(() => {
          result.current.moveDown(maxIndex);
        });

        expect(result.current.yIndex).toBe(maxIndex);
      });
    });

    describe("moveUp", () => {
      it("decrements the y index by 1", () => {
        const { result } = renderHook(() => useGridManager());

        act(() => {
          result.current.moveDown();
        });

        act(() => {
          result.current.moveDown();
        });

        act(() => {
          result.current.moveUp();
        });

        expect(result.current.yIndex).toBe(1);
      });

      it("does not allow decrements into the negative", () => {
        const { result } = renderHook(() => useGridManager());

        act(() => {
          result.current.moveUp();
        });

        expect(result.current.yIndex).toBe(0);
      });
    });
  });
});
