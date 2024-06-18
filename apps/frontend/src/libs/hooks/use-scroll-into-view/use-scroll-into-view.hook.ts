import { useEffect, useRef } from 'react';

const useScrollIntoView = (elements: unknown[]) => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [elements]);

  return lastElementRef;
};

export { useScrollIntoView };
