import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthAdminContext from '../context/AdminAuthContext'

const AdminPrivateRoutes = () => {
    let {authTokens,admin} = useContext(AuthAdminContext)
    let {auth} = {'token':false}
    console.log('here it is',admin);
    return (
      
      authTokens && admin ? <Outlet/> : <Navigate to='/admin/login' exact />
  )
}

export default AdminPrivateRoutes





  