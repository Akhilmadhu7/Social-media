import React, {useState, useEffect,useContext} from 'react'
import Chat from '../../components/User/Chat'
import ChatList from '../../components/User/ChatList'
import Header from '../../components/User/Header'
import Axios from "axios";
import AuthContext from '../../context/UserAuthContext';
import {useParams} from 'react-router-dom'

const baseUrl = "http://127.0.0.1:8000/";

function ChatPage() {
    let {user, authTokens} = useContext(AuthContext)
    const {otherid,otherusername} = useParams()  //getting the userid and username of the person.
    const [userChatList,setUserChatList] = useState([]) //getting all the users list where the logged in user chatted.
    const [username, setUsername] =useState()  //setting the username of other person to get all the chatdata btween the logged and other user.
    const [id, setId] = useState() // other person id to pass through the websocket url to connect the socket.
    const [onMessage, setOnMessage] = useState()
    const [chatMessage, setChatMessage] = useState([]) //to set all the chatdata.

    const myid = user.user_id  //logged in user id to pass through the websocket to connect the socket.
  

  const socket = new WebSocket('ws://127.0.0.1:8000/ws/'+myid+'/'+id+'/')


  socket.onopen = function(e){
    console.log('Connection Established',e);
  }

  socket.onclose = function(e){
    console.log('Connection lost');
  }

  socket.onerror = function(e){
    console.log('Error',e);
  }

  socket.onmessage = function(e){
    console.log('message',e);
    const data = JSON.parse(e.data)
    if (data) {
        setOnMessage(data)
    chatData(username)
    }
    
    // getUserChatList(baseUrl)
  }

  

//To call the total numbers of chat users list.
useEffect(()=>{
    if (otherid!=='' && otherusername!=='') {
        console.log('here is message id',otherid,otherusername);
        // setId(id)
        // setUsername(username)
        get_id(otherid,otherusername)
    }
    getUserChatList(baseUrl)
  },[])

//To call the total numbers of chat users list.
  const getUserChatList = (url)=>{

    Axios.get(url+'chat/chat-list',{
        headers:{
          Authorization:`Bearer ${authTokens.access}`
        }
      }).then((res)=>{
        console.log('result',res.data);
        setUserChatList(res.data)
      })

  }

   //to get the username and id of the person which the logged in user want to chat.
   const get_id = (id,username)=>{
    console.log('other id is',id,username);
    setId(id)
    setUsername(username)
    chatData(username)
  }

  //to get the message send by the user and the username of sender(loggedin user) and reciever.
  const get_message = (message,msg_username)=>{
    console.log('message',message,msg_username);
    // socket.onmessage = JSON.parse(message)
    socket.send(JSON.stringify({
      'message':message,
      'username':msg_username,
      'reciever_user':username
  }))
  getUserChatList(baseUrl)
}

  //to get the chat data of the loggedin user and other person.
  const chatData = (username)=>{
    Axios.get(baseUrl+'chat/chat-data/'+username,{
      headers:{
        Authorization:`Bearer ${authTokens.access}`
      }
    }).then((res)=>{
      console.log('chat data',res.data);
      setChatMessage(res.data)
      console.log('last message',chatMessage.slice(-1));
    })
  }

 



  return (
    <div>

    <Header></Header>
    <div className='flex '>
        <div className='w-3/12'>
        <ChatList userChatList={userChatList} get_id={get_id} ></ChatList>
        
        </div>

        <div className='w-9/12'>
        <Chat chatMessage={chatMessage} get_message={get_message} username={username}></Chat>
        </div>
    </div>
  

    </div>
  )
}

export default ChatPage