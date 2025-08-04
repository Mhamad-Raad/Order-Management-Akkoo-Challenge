import { useRef, useEffect } from 'react';

export const useDragScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const mouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.classList.add('dragging');
    };

    const mouseLeaveOrUp = () => {
      isDown = false;
      el.classList.remove('dragging');
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', mouseDown);
    el.addEventListener('mouseleave', mouseLeaveOrUp);
    el.addEventListener('mouseup', mouseLeaveOrUp);
    el.addEventListener('mousemove', mouseMove);

    return () => {
      el.removeEventListener('mousedown', mouseDown);
      el.removeEventListener('mouseleave', mouseLeaveOrUp);
      el.removeEventListener('mouseup', mouseLeaveOrUp);
      el.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return ref;
};
