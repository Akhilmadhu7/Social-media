import React , {useEffect, useState} from 'react'
import ActiveFriends from '../../components/User/ActiveFriends'
import Header from '../../components/User/Header'
import Notification from '../../components/User/Notification'
import ProfileBar from '../../components/User/ProfileBar'
import Axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../../context/UserAuthContext'

function NotificationPage() {

    let {user} = useContext(AuthContext)
    


  return (
    <div className='bg-slate-100 min-h-screen '>    
        <Header ></Header>
        

        <div className='grid justify-evenly lg:grid-cols-5 sm-grid-cols-1 gap-x-4'>
            <div className=' mt-8 bg-rd-500 ml-8 h-fit hidden lg:flex sticky top-20'>

                <ProfileBar></ProfileBar>
            </div>
           
            <div className=' col-span-3 mb-4 bg-greeen-400 mt-8'>
               
        
                <Notification></Notification>
            </div>
           
            <div className='mr-8 mt-8 bg-vioet-400 h-fit hidden lg:flex  sticky top-20'>

                <ActiveFriends></ActiveFriends>
            </div>
        </div>
    </div>
  )
}

export default NotificationPage