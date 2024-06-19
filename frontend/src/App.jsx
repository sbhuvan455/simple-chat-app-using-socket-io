import React from 'react'
import Home from './pages/Home.jsx'
import Chat from './pages/Chat.jsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>
  )
}

export default App
