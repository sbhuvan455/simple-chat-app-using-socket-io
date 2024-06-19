import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client'
import { Toaster, toast } from 'react-hot-toast'

function Chat() {

    const [searchParams] = useSearchParams();

    const [inputData, setInputData] = useState({
        username: searchParams.get('username'),
        room: searchParams.get('room')
    })

    useEffect(() => {
        const socket = io("http://localhost:3000")

        socket.emit("join Room", inputData.username, inputData.room);
        socket.on("user joined", (message) => {
            toast(message)
        })


        return () => {
            socket.disconnect()
        }

    }, [inputData])
    

    return (
        <div>
            <div><Toaster/></div>
            <div className='text-center font-bold text-3xl'>{inputData.room}</div>
        </div>
    )
}

export default Chat;