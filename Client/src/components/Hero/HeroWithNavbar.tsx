import React from 'react'
import Navbar from '../Navbar/Navbar'
import banner1 from "../../assets/Bnners/banner-1.webp"

const HeroWithNavbar: React.FC = () => {
  return (
    <div className='relative'>
         <div className='w-full h-screen bg-cover bg-center relative'>
        <img 
          src={banner1} 
          alt="Banner" 
          className='w-full h-full object-cover opacity-90' 
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
      </div>
        <Navbar />
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quaerat quod itaque atque ex, perferendis tempora voluptatibus officia quam minus perspiciatis? Quidem doloribus, obcaecati illo iste facere eos aliquid placeat?
        Debitis animi fuga at ea architecto, unde laboriosam hic ab suscipit necessitatibus accusamus facere sit, quam voluptas et voluptate voluptatibus! Minus eaque architecto eos pariatur, nobis incidunt amet veniam! Nesciunt!
        Dicta consequuntur beatae quaerat veritatis ipsa possimus maxime delectus illo nesciunt, doloremque odit quo recusandae, iste nam cum cupiditate sequi dignissimos. Fugiat quidem consectetur sapiente a odit dolor corrupti modi.
        Ratione facere, totam labore error accusamus sequi magni voluptatibus repellendus, enim, neque illum natus consequatur consequuntur voluptatum animi mollitia? Consequuntur minima sunt voluptatem, laboriosam voluptatibus corrupti ad beatae eius nobis?
        Perferendis exercitationem voluptatibus unde rem quisquam suscipit sapiente nulla deleniti atque blanditiis! Culpa ratione dolorum voluptate amet consequuntur quas, sunt neque velit odio fugit? Est tenetur facere aperiam error tempore.</div>
    </div>
  )
}

export default HeroWithNavbar