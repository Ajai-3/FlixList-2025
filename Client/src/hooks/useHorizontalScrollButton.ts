import { useRef } from "react";

const useHorizontalScrollButton = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 224;
      const gap = 40; 
      const cardsPerScroll = 3;
      const scrollAmount = direction === "left" ? -(cardWidth + gap) * cardsPerScroll : (cardWidth + gap) * cardsPerScroll;

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return { scrollRef, scroll };
};

export default useHorizontalScrollButton;