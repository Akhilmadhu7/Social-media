import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../../components/User/Login'

function LoginPage() {
  return (
    <div className='bg-indigo-800 h-screen'>
      <header className=' pt-5 pb-5'>
        <div className='flex justify-between'>
          <div className='ml-12 bg-red-'>
            <h3 className='text-white'>Logo</h3>
          </div>
          <div className=' bg-red-'>
            <h3 className='text-white'>Social Media</h3>
          </div>
          <div className='mr-12 flex bg-red-'>
            <Link className='mr text-white' to='/signup'>
              Signup
            </Link>
          </div>
        </div>

      </header>
      <Login/>
    </div>
  )
}

export default LoginPage