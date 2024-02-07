import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      setIsIntersecting(entries[0].isIntersecting);
    });
  }, []);

  const setNodeRef = (node) => {
    if (!node) {
      return;
    }

    observerRef.current.observe(node);
  };

  return [isIntersecting, setNodeRef];
};

export default useIntersectionObserver;
