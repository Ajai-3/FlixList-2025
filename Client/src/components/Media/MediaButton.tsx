import React from 'react'
import { motion } from 'framer-motion';

interface MediaDetailsProps {
  name: string
  icon: React.ReactNode;
  color: string
}

const MediaButton: React.FC<MediaDetailsProps> = ({ name, icon, color }) => {
  return (
    <>
    <motion.button whileTap={{ scale: 0.85 }} className={`px-6 py-[10px] rounded-lg ${color} ${color === "bg-green-200" ? "text-green-700" : "text-blue-700"} font-bold flex justify-between`}>{name}{icon}</motion.button>
    </>
  )
}

export default MediaButton