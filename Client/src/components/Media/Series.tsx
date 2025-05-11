import React from 'react'
import SeriesDiv from './SeriesDiv';


interface MediaDetailsProps {
    media: any;
  }
const Series: React.FC<MediaDetailsProps> = ({ media }) => {
  return (
   <div className='px-20 mb-8'>
     <div className='flex gap-6 justify-start px-4 overflow-auto scrollbar-hidden py-4'>
       {media.seasons.map((season: any, i: any) => (
        <SeriesDiv key={season.id || i} season={season} />
    ))}
    </div>
   </div>
  )
}

export default Series