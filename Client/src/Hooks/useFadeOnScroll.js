import { useEffect } from 'react';

function useFadeOnScroll(target, classStyle) {
  useEffect(() => {    
    function callback(entrys) {
      entrys.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(classStyle);
        }
      });
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(target.current);
  }, []);
}

export default useFadeOnScroll;