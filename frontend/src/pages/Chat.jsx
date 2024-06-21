import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import { Toaster, toast } from "react-hot-toast";
import { IoSend } from "react-icons/io5";

function Chat() {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [searchParams] = useSearchParams();

  const [inputData, setInputData] = useState({
    username: searchParams.get("username"),
    room: searchParams.get("room"),
  });

  const [inputMessage, setInputMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    socket.emit("sendMessage", inputMessage, {username: inputData.username, room: inputData.room});
    setInputMessage("");
  }


  const members = [
    {
      id: "1",
      username: inputData.username,
      status: "connected",
    }
  ];

  useEffect(() => {

    console.log("hello world!");

    socket.on('connect', () => {
      console.log("connected to server in useEffect Hook");
    })

    socket.emit("join Room", inputData.username, inputData.room);

    socket.on("user joined", (message, userDetails) => {
      toast(message);
      console.log(message)
    });

    socket.on("message recieved", (message, username) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          user: username,
          text: message
        }
      ])

      console.log(messages)

    })

    return () => {
      socket.disconnect();
    };
  }, [inputData.username, inputData.room]);

  

  return (
    <div className="w-full h-[100vh] ">
      <div>
        <Toaster />
      </div>
      <div className="text-center font-semibold text-3xl py-4 bg-green-500 text-white absolute top-0 w-full select-none">
        {inputData.room}
      </div>
      <div className="flex w-full h-[100vh] overflow-hidden">
        <div className="w-[25%] bg-slate-100 select-none flex-col gap-5 pt-20">
          {members.map((member) => {
            return (
              <div key={member.id} className="w-full flex items-center gap-5 px-6 my-5">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAACUCAMAAADBJsndAAAAMFBMVEXk5ueutLfo6uulrbCrsbTIzM7d4OHU19m2u77h4+Sxt7rBxsi6v8K+w8XZ3N7Mz9F5oCpfAAADrUlEQVR4nO2c2ZLjIAxFQcFgs5j//9sBnJkkPUkHhC2givuU6qdTwlqASzM2NTU1NTU1NTU1NTU1NTV1kgAY24KOX30KYJPKL8ZZa83i1d4lK8Du1pWLf+J6XWRnpCGUJpD9VPiTl63ZngT7O8oDlRvZSUyBGf6BMpHqpQtQUJ9i+YhpDyFdvlAmNQ/ptuZgcmHbgsosygiqW679rjMxA+i6NQPdsikP0BEwI2gjTlvGyYVpsfKQVZBeQT09KKhbKWYA3clBt/xUf+K01JiIVU+giphzx1BGUFpMMKhwBk7aTi8RSXRIU1Z7cMhwEge0sBO9cFq6gILHc4YaSsbJ8MtO2j0lpsY/QMk4VUU4Ob9RbZXRxfMeT6qMh6pl55xqrwToIn9I02BWNKM7J9EHWpdGQYpk4ZEj3ZNoxvrKdKfjLN2//RRRYZqck7NrTlPLSZTvg9TPUfpRfX8n2nmMMi9BHSbd/DnIPD/K/miY/eYo+/dhzkMGOV9i4PCcpAegg5x/4g9Aic+TRzmfx/YkQTQqPTTI/dEw93GYlW9xvxktF6WYrolTAGQhZjOjQBGooBrj36igijY2sozhtwkaw78UlFOexNKaMstfJ3rw143iV2QxpG4A/yeLIZXv/bRikawfzKjkT9aHM5nf/clm78yfnASw7cobF3T4vbceKZMgkUX7/P1nb4LD4C/l/ldSRrt/T7SB5e7vX1et08cZckjr1TpnOrH7R0Sjub6nzv/5HoC5tr5hQsW08YbfvnWjBHwTdtlblChgysRXEt8ZH7Fdnad9SBFqpeW/9cpPrJyvihFFFdjuNf6EXgi3E5BC6OW67l5GCOuvJgWlC77Jj6ScLxfu6ULurJVXMg9U4a+ao0DZE2L5IA1z6QWkIGsO5d9Ln34qBuARdeirhDt38UHaCygjqD7zyAn8NZSJ9LR7hfhG7zLMGNJzvlLIfApVoTPWHqpdAd8lTD3mhZ/mE6irbKQ0mOn8qQa03rKSDVrzLI0OM12FYEEpUugJFHt6T4uZkgmlOtcCBhRVR6FybMeAIq7BKp7E4FV+6Q2KnhLjHSm+bDsJtNA8Uu+VxoIWBRS2s/ZrxZxFh/lw0fieoZL7MMC6Kk5QSUCbfZ1RBbVpa4hZ0JUox6R3yuZsSpnfPbP/OcRFnJlNCZammJxn+jOq3xvUKtMPTj53/lRexreZlF44s1wFVFvhXzhd1gfauHry3IcALQb5V4mceG7rrbmyHPbQXlnrPjU1Vag/WiQ0MQZgYbAAAAAASUVORK5CYII="
                  alt="logo"
                  className="w-10 rounded-3xl"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-serif font-semibold">{member.username}</p>
                  <p className="font-sans">🟢 {member.status}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-amber-50 w-[75%] overflow-y-scroll pb-8">
          <div className="pt-20 pb-20">
            {messages.map((message, index) => {
              return (
                (message.user === inputData.username) ? (
                  <div key={index} className="py-2 px-2 bg-green-400 text-white my-2">
                    {message.text}
                  </div>
                ):(
                  <div key={index} className="py-2 px-2 bg-white text-black my-2">
                    {message.text}
                  </div>
                )
              )
            })}
          </div>
          <div className="w-[75%] h-14 bg-slate-200 absolute bottom-7 rounded-md flex items-center justify-center gap-6">
            <input
              type="text"
              name="message"
              id="message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-[90%] border-gray-200 outline-none px-3 py-2 border-2 rounded-full text-sm"
            />
            <IoSend size={30} color="green" className="cursor-pointer" onClick={sendMessage}/>
          </div>
        </div>
      </div>
      <div className="text-white bg-black text-center py-1 font-light w-full absolute bottom-0 text-sm">
        &copy; All Rights Reserved
      </div>
    </div>
  );
}

export default Chat;
