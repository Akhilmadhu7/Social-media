import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AuthAdminContext from '../../context/AdminAuthContext'

function AdminLayout() {
  console.log('her also came');
  let {authTokens,admin} = useContext(AuthAdminContext)
  let {auth} = {'token':false}
  console.log('here it is',admin.is_admin);
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




const AdminPrivateRoutes = () => {
    let {authTokens,admin} = useContext(AuthAdminContext)
    let {auth} = {'token':false}
    console.log('here it is',admin);
    return (
      
      authTokens && admin ? <Outlet/> : <Navigate to='/admin/login' exact />
  )
}

// export default AdminPrivateRoutes




  