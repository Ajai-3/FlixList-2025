import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../api/AxiosInstance'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Details from '../components/Media/Details'

const MediaDetail: React.FC = () => {
  const { type, id } = useParams<{ type: string, id: string }>()
  const [media, setMedia] = useState<any>();

  useEffect(() => {
    const fetchMediaDetails = async () => {
       try {
        let response;
        if(type === "movie") {
          response = await axiosInstance.get(`/movie/${id}`)
          console.log(response.data)
        } else if(type === "series") {
          response = await axiosInstance.get(`/tv/${id}`)
        } 
        if (response) {
          setMedia(response.data);
        }
       } catch (error) {
        console.error('Error fetching media details:', error);
       }
    }
    if (id && type) {
      fetchMediaDetails(); 
    }

  }, [type, id])

  if(!media) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Navbar />
      <Hero media={media} />
      <Details media={media} />
      <Footer />
    </div>
  )
}

export default MediaDetail