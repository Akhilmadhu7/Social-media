import React from 'react'
import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'

function AdminLayout() {
  return (
    <div className='flex'>
        <div>
            <Sidebar/>
        </div>
        <div className='w-full p-2'>
            <Outlet></Outlet>
        </div>

    </div>
  )
}

export default AdminLayout