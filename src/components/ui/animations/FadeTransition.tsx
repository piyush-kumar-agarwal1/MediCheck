import { useState, useEffect } from "react";

interface FadeTransitionProps {
  show: boolean;
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

export const FadeTransition = ({
  show,
  children,
  duration = 0.3,
  delay = 0
}: FadeTransitionProps) => {
  const [shouldRender, setShouldRender] = useState(show);
  const [opacity, setOpacity] = useState(show ? 1 : 0);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      // Small delay to ensure the DOM element exists before animating
      const timer = setTimeout(() => {
        setOpacity(1);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        opacity,
        transition: `opacity ${duration}s ease-in-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeTransition;