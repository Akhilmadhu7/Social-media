import React from 'react'
import Header from '../../components/User/Header'
import SearchUsers from '../../components/User/SearchUsers'
import ProfileBar from '../../components/User/ProfileBar'
import ActiveFriends from '../../components/User/ActiveFriends'

function SearchUsersPage() {
  return (
    <div className='bg-slate-100 min-h-screen'>
        <Header></Header>
        

        <div className='grid justify-evenly lg:grid-cols-5 sm-grid-cols-1 gap-x-4'>
            <div className=' mt-8 bg-rd-500 ml-8 h-fit hidden lg:flex sticky top-20'>

                <ProfileBar></ProfileBar>
            </div>
           
            <div className=' col-span-3 mb-4 bg-gren-400 '>
               
        
                <SearchUsers></SearchUsers>
            </div>
           
            <div className='mr-8 mt-8 bg-vioet-400 h-fit hidden lg:flex  sticky top-20'>

                <ActiveFriends></ActiveFriends>
            </div>
        </div>
    </div>
  )
}

export default SearchUsersPage