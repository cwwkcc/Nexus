import { useMotionValue, useSpring } from 'framer-motion';

type UseMouseParallaxOptions = {
  stiffness?: number;
  damping?: number;
};

export function useMouseParallax({
  stiffness = 50,
  damping = 20,
}: UseMouseParallaxOptions = {}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness, damping });
  const springY = useSpring(mouseY, { stiffness, damping });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(((clientX - left) / width - 0.5) * 2);
    mouseY.set(((clientY - top) / height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return { springX, springY, handleMouseMove, handleMouseLeave };
}
