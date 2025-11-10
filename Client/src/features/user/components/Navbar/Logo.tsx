import React from 'react'
import { motion } from 'framer-motion'
// import logo from "../../assets/Logo/logl-2.png"
import logo from "../../../../assets/Logo/logo-1.png"
import { useNavigate } from 'react-router-dom'

const Logo: React.FC = () => {
  const navigate = useNavigate()
  return (
    <motion.div
    onClick={() => navigate("/")}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 1 * 0.1, type: "spring", stiffness: 200 }}
    className='flex justify-center items-center'
    >
        <img src={logo} className='w-40 cursor-pointer' alt="" />
    </motion.div>
  )
}

export default Logo