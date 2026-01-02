import React, { useRef } from 'react'
import SeriesDiv from './SeriesDiv';
import LeftArrowButton from '@/components/home/Contents/LeftArrowButton';
import RightArrowButton from '@/components/home/Contents/RightArrowButton';


interface MediaDetailsProps {
    media: any;
    onSeasonClick: (seasonNumber: number) => void;
  }
const Series: React.FC<MediaDetailsProps> = ({ media, onSeasonClick }) => {
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
   <div className='mb-8 px-10'>
    <div className="flex gap-2 justify-end">
        <LeftArrowButton onClick={() => scroll("left")} />
        <RightArrowButton onClick={() => scroll("right")} />
      </div>
     <div ref={scrollRef} className='flex gap-10 p-4 justify-start overflow-auto scrollbar-hidden'>
       {media.seasons.map((season: any, i: any) => (
        <SeriesDiv key={season.id || i} season={season} onClick={() => onSeasonClick(season.season_number)} />
    ))}
    </div>
   </div>
  )
}

export default Series