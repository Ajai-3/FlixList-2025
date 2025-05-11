import React from "react";
import CastDiv from "./CastDiv";
import LeftArrowButton from "../Contents/LeftArrowButton";
import RightArrowButton from "../Contents/RightArrowButton";
import useHorizontalScrollButton from "../../hooks/useHorizontalScrollButton";

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
  const { scrollRef, scroll } = useHorizontalScrollButton();


  return (
    <div className="mb-8 px-10 mt-6">

      <div className="flex gap-2 justify-end">
        <LeftArrowButton onClick={() => scroll("left")} />
        <RightArrowButton onClick={() => scroll("right")} />
      </div>

      <div
        ref={scrollRef}
        className="flex gap-10 p-4 justify-start overflow-auto scrollbar-hidden"
      >
        {cast.map((member, i) => (
          <CastDiv key={member.id || i} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Cast;