import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from '../../components/Admin/Dashboard'
import Header from '../../components/Admin/Header'
import AuthAdminContext from '../../context/AdminAuthContext'

function DashboardPage() {

  let {authTokens, admin} = useContext(AuthAdminContext)
    const navigate = useNavigate()

    useEffect( ()=>{
        if (admin) {
            navigate('/admin/dashboard')
            
        } else {
            navigate('/adminlogin')
        }

    },[])
    
  return (
    <div>
        {/* <Header></Header> */}
        {admin && 
        <Dashboard></Dashboard> }
    </div>
  )
}

export default DashboardPage