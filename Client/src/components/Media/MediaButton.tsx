import React from 'react'

interface MediaDetailsProps {
  name: string
  icon: React.ReactNode;
  color: string
}

const MediaButton: React.FC<MediaDetailsProps> = ({ name, icon, color }) => {
  return (
    <>
    <button className={`px-6 py-[10px] rounded-lg ${color} ${color === "bg-green-200" ? "text-green-700" : "text-blue-700"} font-bold flex justify-between`}>{name}{icon}</button>
    </>
  )
}

export default MediaButton