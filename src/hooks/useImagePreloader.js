import { useState, useEffect, useRef } from 'react';

// Module-level flag — survives React re-mounts so the loading screen
// only appears once per browser session, not on every navigation.
let _loaded = false;

function useImagePreloader(srcs) {
  const [allLoaded, setAllLoaded] = useState(_loaded);
  const cache = useRef([]);

  useEffect(() => {
    if (_loaded) return;

    let settled = 0;
    cache.current = srcs.map(src => {
      const img = new window.Image();
      img.onload = img.onerror = () => {
        settled++;
        if (settled === srcs.length) {
          _loaded = true;
          setAllLoaded(true);
        }
      };
      img.src = src;
      return img;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return allLoaded;
}

export default useImagePreloader;
