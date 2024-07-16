import { act, renderHook } from "@testing-library/react";
import { useWindowSize } from "../useWindowSize";

describe("useWindowSize", () => {
  it("returns the window's inner height and width", () => {
    global.innerWidth = 500;
    global.innerHeight = 1000;

    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(global.innerWidth);
    expect(result.current.height).toBe(global.innerHeight);
  });

  it("returns updated window size when the window resizes", () => {
    global.innerWidth = 500;
    global.innerHeight = 1000;

    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(global.innerWidth);
    expect(result.current.height).toBe(global.innerHeight);

    global.innerWidth = 7000;
    global.innerHeight = 50000;

    act(() => {
      global.dispatchEvent(new Event("resize"));
    });

    expect(result.current.width).toBe(global.innerWidth);
    expect(result.current.height).toBe(global.innerHeight);
  });

  it("unregisters the resize listener when unmounted", () => {
    const spy = jest.spyOn(global, "removeEventListener");
    const { unmount } = renderHook(() => useWindowSize());

    act(() => {
      unmount();
    });

    expect(spy).toHaveBeenCalled();
  });
});
