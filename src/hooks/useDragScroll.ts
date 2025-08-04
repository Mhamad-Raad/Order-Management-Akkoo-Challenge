import { useCallback } from 'react';

export function useDragScroll<T extends HTMLElement>() {
  const attachListeners = (element: T | null) => {
    if (!element) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      element.classList.add('dragging');
      startX = e.pageX - element.offsetLeft;
      scrollLeft = element.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      element.classList.remove('dragging');
    };

    const handleMouseUp = () => {
      isDown = false;
      element.classList.remove('dragging');
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const walk = (x - startX) * 1.2;
      element.scrollLeft = scrollLeft - walk;
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mousemove', handleMouseMove);

    // Clean up when DOM element unmounts
    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  };

  const ref = useCallback((node: T | null) => {
    if (node) {
      attachListeners(node);
    }
  }, []);

  return ref;
}
