import React from 'react'
import SeriesDiv from './SeriesDiv';


interface MediaDetailsProps {
    media: any;
  }
const Series: React.FC<MediaDetailsProps> = ({ media }) => {
  return (
   <div className='mb-8 px-10'>
     <div className='flex gap-10 p-4 justify-start overflow-auto scrollbar-hidden'>
       {media.seasons.map((season: any, i: any) => (
        <SeriesDiv key={season.id || i} season={season} />
    ))}
    </div>
   </div>
  )
}

export default Series