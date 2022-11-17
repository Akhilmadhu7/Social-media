import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/UserAuthContext'

const PrivateRoutes = () => {
  let {authTokens} = useContext(AuthContext)
  let {auth} = {'token':false}
  return (
    
    authTokens ? <Outlet/> : <Navigate to='/' exact />
  )
}

export default PrivateRoutes
