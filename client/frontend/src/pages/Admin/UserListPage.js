import React, { useContext, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import Header from '../../components/Admin/Header'
import UserList from '../../components/Admin/UserList'
import AuthAdminContext from '../../context/AdminAuthContext'

function UserListPage() {

  const navigate = useNavigate()

  let {admin, authTokens} = useContext(AuthAdminContext)
  useEffect(()=>{
    if (admin) {
      navigate('/admin/userlist')
      
    } else {
      navigate('/adminlogin')
    }
  }, [])
  return (
    <div>
        {/* <Header></Header> */}
        {admin && 
        <UserList></UserList> }
    </div>
  )
}

export default UserListPage