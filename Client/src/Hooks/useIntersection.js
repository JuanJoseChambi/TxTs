
import { useEffect, useRef } from 'react';

function useFadeInOnScroll(ref, classStyle) {
    useEffect(() => {

        function callback (entrys) {
            entrys.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(classStyle)
                }
            })}
        const option = {
            root: null,
            rootMargin: "0px",
            threshold: 0.3
        }
        const observadorModal = new IntersectionObserver(callback, option);
        observadorModal.observe(ref)
    },[ref, classStyle])
    
}

export default useFadeInOnScroll;