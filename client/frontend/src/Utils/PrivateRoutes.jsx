import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/UserAuthContext'

const PrivateRoutes = () => {
  let {authTokens,user} = useContext(AuthContext)
  let {auth} = {'token':false}
  return (
    
    authTokens && user ? <Outlet/> : <Navigate to='/' exact />
  )
}

export default PrivateRoutes
