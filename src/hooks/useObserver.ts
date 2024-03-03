import { useRef, useCallback } from "react";

const useObserver = (
  loading: boolean,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (itemElement: HTMLImageElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (itemElements) => {
          const itemElement = itemElements[0];
          if (itemElement && itemElement.isIntersecting) {
            setPageNumber((prev) => prev + 1);
          }
        },
        {
          threshold: [0, 1],
        }
      );

      if (itemElement) observer.current?.observe(itemElement);
    },
    [loading, setPageNumber]
  );

  return lastItemRef;
};

export default useObserver;
