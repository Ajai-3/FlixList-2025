import React from 'react'
import logo from "../../public/assets/Logo/logo-1.png"
import { useNavigate } from 'react-router-dom'

const Logo: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div
    onClick={() => navigate("/")}
    className='flex justify-center items-center animate-slide-down'
    >
        <img src={logo} className='w-40 cursor-pointer' alt="" />
    </div>
  )
}

export default Logo
