import React from 'react'
import Home from '../../components/User/Home'
import Header from '../../components/User/Header'
import {useEffect, useContext} from 'react'
import AuthContext from '../../context/UserAuthContext'
import {useNavigate} from 'react-router-dom'
import ProfileBar from '../../components/User/ProfileBar'
import ActiveFriends from '../../components/User/ActiveFriends'
import Story from '../../components/User/Story'

function HomePage() {

    let {authTokens, user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect( ()=>{
        if (user) {
            navigate('/home')
            
        } else {
            console.log('aksdjh');
            navigate('/')
        }

    },[])

  return (
    <div>

        <Header></Header>
        <div className='bg-slate-200 grid justify-around lg:grid-cols-5 sm-grid-cols-1 gap-x-4'>
            <div className=' mt-8 bg-rd-500 ml-3 h-fit hidden lg:flex'>

                <ProfileBar></ProfileBar>
            </div>
            {/* <div> */}
            <div className=' col-span-3 mt-8 bg-gren-400 '>
                <div className='bg-white rounded-md '>

                <Story ></Story>
                </div>
        
                <Home></Home>
            </div>
            {/* </div> */}
            <div className='mr-3 mt-8 bg-vioet-400 h-fit hidden lg:flex'>

                <ActiveFriends></ActiveFriends>
            </div>
        </div>

    </div>
  )
}

export default HomePage