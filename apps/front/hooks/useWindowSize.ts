import { useState, useEffect, useMemo } from 'react';

// ONLY for use on elements loaded outside first view

export const useWindowSize = (size: number) => {
  const [windowSize, setWindowSize] = useState<number | null>(null);

  function handleResize() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMinSize = useMemo(() => (windowSize || 0) >= size, [size, windowSize]);

  return {
    windowSize,
    isMinSize,
  };
};
