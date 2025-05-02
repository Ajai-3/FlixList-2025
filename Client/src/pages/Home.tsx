import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Content from '../components/Contents/Content'
import Footer from '../components/Footer/Footer'

const Home:React.FC = () => {
  return (
    <>
   
    <Navbar />
    <Hero />
    <Content />
    <Footer />
    </>
  )
}

export default Home