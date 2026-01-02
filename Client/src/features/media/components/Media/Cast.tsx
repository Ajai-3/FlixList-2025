import React, { useRef } from "react";
import CastDiv from "./CastDiv";
import LeftArrowButton from "@/components/home/Contents/LeftArrowButton";
import RightArrowButton from "@/components/home/Contents/RightArrowButton";

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CastProps {
  cast: CastMember[];
}

const Cast: React.FC<CastProps> = ({ cast }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 224;
      const gap = 40;        
      const cardsPerScroll = 3;
      const scrollAmount =
        direction === "left"
          ? -(cardWidth + gap) * cardsPerScroll
          : (cardWidth + gap) * cardsPerScroll;

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8 px-10 mt-6">
      <div className="flex gap-2 justify-end">
        <LeftArrowButton onClick={() => scroll("left")} />
        <RightArrowButton onClick={() => scroll("right")} />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-10 p-4 justify-start overflow-x-auto touch-pan-x scroll-smooth snap-x scrollbar-hidden"
      >
        {cast.map((member, i) => (
          <div key={member.id || i} className="snap-start">
            <CastDiv member={member} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
