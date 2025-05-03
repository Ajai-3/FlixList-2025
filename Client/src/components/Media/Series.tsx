import React from 'react'
import SeriesDiv from './SeriesDiv';


interface MediaDetailsProps {
    media: any;
  }
const Series: React.FC<MediaDetailsProps> = ({ media }) => {
  return (
    <div className='flex gap-6 justify-start px-32'>
       {media.seasons.map((season, i) => (
        <SeriesDiv key={season.id || i} season={season} />
    ))}
    </div>
  )
}

export default Series