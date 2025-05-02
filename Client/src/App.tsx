import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import MediaDetail from './pages/MediaDetail'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/media/:type/:id' element={<MediaDetail />} />
    </Routes>
  )
}

export default App