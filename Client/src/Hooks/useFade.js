import { useState } from 'react';

function useFade() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const isOpen = () => {
    setIsVisible(true);
    setIsClosing(false);
  };

  const onClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  return { isVisible, isClosing, isOpen, onClose };
}

export default useFade;