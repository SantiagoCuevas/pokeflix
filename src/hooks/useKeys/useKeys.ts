import { useCallback, useEffect } from "react";

type KeyHandlers = { [keyCode: number]: () => void };

interface UseKeysProps {
  handlers: KeyHandlers;
}

export const useKeys = (props: UseKeysProps) => {
  const { handlers } = props;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const handler = handlers[e.keyCode];
      if (handler) {
        e.preventDefault();
        handler();
      }
    },
    [handlers]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
