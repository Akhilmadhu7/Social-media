import React from 'react'
import AuthContext from '../../context/UserAuthContext'
import {useContext} from 'react'

function Header() {

    let {user,logoutUser} = useContext(AuthContext)


  return (
    <div className='bg-indigo-800 h-full'>
      <header className=' pt-5 pb-5'>
        <div className='flex justify-between'>
          <div className='ml-12 bg-red-'>
            <h3 className='text-white'>Logo</h3>
          </div>
          <div className=' bg-red-'>
            <h3 className='text-white'>Social Media</h3>
          </div>
          <div className="mr-12 flex bg-white
            px-2 py-1 tracking-wide bg-slate-200 font-medium transition-colors duration-200
           transform bg-white-700 rounded-md hover:bg-violet-50 hover:text-red-600 focus:outline-none"
          >
            {/* <Link className='mr text-white' to='/signup'> */}
              {/* <h3 className='text-white'>{user.username}</h3> */}
              <button onClick={logoutUser}>
                Logout
              </button>
            {/* </Link> */}
          </div>
        </div>

      </header>
      {/* <Login/> */}
    </div>
  )
}

export default Header