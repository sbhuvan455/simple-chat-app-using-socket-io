import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {

  const [input, setInput] = useState({
    username: '',
    Room: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/chat?username=${input.username}&room=${input.Room}`)
  }

  return (
    <div className='w-full h-[90vh] text-center py-20'>
      <div className='text-3xl font-bold text-yellow-900'>
        Welcome to Chit-Chatters
      </div>
      <form onSubmit={ handleSubmit } className='w-80 py-16 rounded-md shadow-md shadow-slate-300 bg-slate-100 mx-auto my-10 flex flex-col gap-8 justify-center items-center'>
        <div className='flex flex-col gap-2 justify-center w-4/5 items-start mx-auto text-black font-serif font-semibold'>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name="username"
            id="username" 
            value={ input.username }
            onChange={(e) => setInput(
              {
                ...input,
                username: e.target.value
              }
            )}
            className='border-gray-200 w-[100%] outline-none px-2 py-2 border-2 rounded-md'
          />
        </div>
        <div className='flex flex-col gap-2 justify-center w-4/5 items-start mx-auto text-black font-serif font-semibold'>
          <label htmlFor="Room">Room Name</label>
          <input 
            type="text" 
            name="Room" 
            id="Room" 
            value={ input.Room }
            onChange={(e) => setInput({
              ...input,
              Room: e.target.value
            })}
            className='border-gray-200 w-[100%] outline-none px-2 py-2 border-2 rounded-md'
          />
        </div>
        <button type="submit" className='w-[80%] bg-blue-500 rounded-md py-2 font-semibold text-white text-xl '>Join Room</button>
      </form>
    </div>
  )
}

export default Home
