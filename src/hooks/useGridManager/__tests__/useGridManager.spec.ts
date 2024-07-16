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
  });
});
