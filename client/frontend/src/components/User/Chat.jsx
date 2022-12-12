import React,{useState,useContext} from "react";
import AuthContext from "../../context/UserAuthContext";

function Chat({chatMessage,get_message,username}) {
    let {user} = useContext(AuthContext)
    const [message,setMessage] = useState([])

    return (
        <div>
          <body class="flex flex-col items-center justify-center h-[90vh] bg-gray-100 text-gray-800 p-10">
            {username}
            <div class="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden">
              <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
                {chatMessage?.map((chat)=>{
                  return(
                    <>
                    {chat.sender!==user.username? 
                    <div class="flex w-full mt-2 space-x-3 max-w-xs">
                      <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                      <div>
                        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                          <p class="text-sm">
                           {chat.message}
                          </p>
                        </div>
                        <span class="text-xs text-gray-500 leading-none">
                          2 min ago
                        </span>
                      </div>
                    </div> :
                    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                        <div>
                          <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                            <p class="text-sm">
                            {chat.message}
                            </p>
                          </div>
                          <span class="text-xs text-gray-500 leading-none">
                            2 min ago
                          </span>
                        </div>
                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                      </div>
                      }
                      </>
                )
                })}
                
               
    
    
    
    
    
    
    
                
              </div>
    
    
    
    
    
    
    
    
              <div class="bg-gray-300 p-4 flex">
                <input
                // value={message}
                  class="flex items-center h-10 w-full rounded px-3 text-sm"
                  type="text"
                  placeholder="Type your message…"
                  onChange={(e) =>  setMessage(e.target.value)}
                />
                <button
                 onClick={()=>get_message(message,user.username)}
                 className="px-2"
                 type="submit">
                  send
                </button>
              </div>
            </div>
          </body>
        </div>
      );
}

export default Chat;
