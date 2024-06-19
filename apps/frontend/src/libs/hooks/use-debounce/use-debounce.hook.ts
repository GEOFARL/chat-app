import { useCallback } from "react";

const useDebounce = (effect, delay, deps: unknown[]) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, [callback, delay]);
};
