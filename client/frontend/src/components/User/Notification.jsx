import Axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useContext } from 'react'
import AuthContext from '../../context/UserAuthContext'
import { format } from "timeago.js";


const baseUrl = "http://127.0.0.1:8000/chat/"

function Notification() {

    let {user,authTokens} = useContext(AuthContext)
    const [notifyData, setNotifyData] = useState([])

    useEffect(()=>{
        try {
            Axios.get(baseUrl+'notifications',{
                headers:{
                    Authorization:`Bearer ${authTokens.access}`
                }
            }).then((res)=>{
                console.log('notification result',res.data.Data);
                setNotifyData(res.data.Data)
            })
        } catch (error) {
            
        }
    },[])

  return (
    <div>



<div className="max-w-lg mx-auto items-center h-screen">
    {notifyData?.map((notify)=>{
        return(
            <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
        <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                {notify.notify_sender.profile_pic ?
                <img className="w-full h-full object-cover rounded-full"
                 src={notify.notify_sender.profile_pic}
                 alt=""/> :
                 <svg
                            // className="rounded-full items-start text-gray-400 flex-shrink-0 mr-3"
                            className="w-full h-full object-cover rounded-full"
                            width="32"
                            height="32"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>}
            </div>
        </div>
        <div>
            <span className="font-mono">{notify.notification_text}</span>
            <span className="text-xs text-gray-500 leading-none ml-2">
                          {format(notify.timestamp)}
                        </span>
        </div>
        <div className="flex gap-2">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
            </button>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
            </button>
        </div>
    </div>
        )
    })}
    

    {/* <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
        <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                <img className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""/>
            </div>
        </div>
        <div>
            <span className="font-mono">Tom liked one of your comments</span>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
            </svg>
        </div>
    </div> */}

    {/* <div className="flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
        <div className="relative w-16 h-16 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                <img className="w-full h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt=""/>
            </div>
        </div>
        <div>
            <span className="font-mono">Andrea posted a new Tweet have a look</span>
        </div>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
        </div>
    </div> */}
</div>





    </div>
  )
}

export default Notification