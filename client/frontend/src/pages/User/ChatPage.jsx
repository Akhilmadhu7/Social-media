import React from 'react'
import Chat from '../../components/User/Chat'
import ChatList from '../../components/User/ChatList'
import Header from '../../components/User/Header'

function ChatPage() {
  return (
    <div>

    <Header></Header>
    <div className='flex '>
        <div className='w-3/12'>
        <ChatList></ChatList>
        
        </div>

        <div className='w-9/12'>
        <Chat></Chat>
        </div>
    </div>
  

    </div>
  )
}

export default ChatPage