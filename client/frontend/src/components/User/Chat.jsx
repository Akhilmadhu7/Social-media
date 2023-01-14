import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

function Chat({ chatMessage, get_message, username }) {
  let { user } = useContext(AuthContext);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();
  const scroll = useRef()

  //funciton to go to the friend profile component.
  const findProfile = (username) => {
    console.log("here is the id", username);
    navigate("/user/friend-profile/" + username);
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
}, [chatMessage])

  const passMessage = (mess,ur)=>{
    get_message(mess,ur)
    setMessage('')
  }
  

  return (
    <div>
      <body class="flex flex-col items-center justify-center h-[90vh] bg-gray-100 text-gray-800 p-10">
        <div className="flex mr-auto mb-2" >
          <a className="inline-flex " href="#0">
            {/* <img 
              className="rounded-full"
              src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg"
              width="48"
              height="48"
              alt="Lauren Marsano"
            /> */}
          </a>
          <div onClick={() => findProfile(username)}
           className=" ml-2 ">
              <h2 className="text-xl pt-2 leading-snug font-bold cursor-pointer">
                {username}
              </h2>
          </div>
        </div>
        {/* <p className="cursor-pointer" onClick={() => findProfile(username)}>{username}</p> */}
        <div class="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
          <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {chatMessage?.map((chat) => {
              return (
                <>
                  {chat.sender.username !== user.username ? (
                    <div class="flex w-full mt-2 space-x-3 max-w-xs" ref={scroll}>
                      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                        <img className="rounded-full"
                         src={chat.sender.profile_pic} />
                      </div>
                      <div>
                        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                          <p class="text-sm">{chat.message}</p>
                        </div>
                        <span class="text-xs text-gray-500 leading-none">
                          {format(chat.timestamp)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end" ref={scroll}>
                      <div>
                        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                          <p class="text-sm">{chat.message}</p>
                        </div>
                        <span class="text-xs text-gray-500 leading-none">
                          {format(chat.timestamp)}
                        </span>
                      </div>
                      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300">
                        <img className="rounded-full"
                         src={chat.sender.profile_pic} />
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>

          <div class="bg-gray-300 p-4 flex">
            <input
              value={message}
              class="flex items-center h-10 w-full rounded px-3 text-sm"
              type="text"
              placeholder="Type your message…"
              onChange={(e) => setMessage(e.target.value)}
            />
            {message !== "" ? (
              <button
                // onClick={() => get_message(message, user.username)}
                onClick={()=>passMessage(message,user.username)}
                className="px-2"
                type="submit"
              >
                send
              </button>
            ) : (
              <button className="px-2" type="submit">
                send
              </button>
            )}
          </div>
        </div>
      </body>
    </div>
  );
}

export default Chat;
