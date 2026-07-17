import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Direct property assignment jumps instantly, bypassing the site's
    // `html { scroll-behavior: smooth }` rule — window.scrollTo(0, 0) would
    // inherit that and animate, which can get cut short by route content
    // still laying out (images loading, etc.) and never actually reach 0.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

export default ScrollToTop;
