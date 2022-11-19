import { createContext, useState, useEffect } from "react";
import {json, Link, useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import Swal from "sweetalert2";


const AuthAdminContext = createContext()

export default AuthAdminContext


export const AuthAdminProvider = ({children}) =>{

    const navigate = useNavigate()
    
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [admin, setAdmin] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)


    let loginAdmin = async (e) =>{

        e.preventDefault()

        // let response = await fetch('http://127.0.0.1:8000/api/token', {
        //     method:'POST',
        //     headers:{
        //         'Content-Type':'application/JSON'
        //     },
        //     body:JSON.stringify({'username':e.tartget.username.value,'password':e.tartget.password.value})

        // })
        let response = await fetch('http://127.0.0.1:8000/myadmin/token/', {
            method:'POST', 
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })

        let data = await response.json()
        console.log('kkkk',data);

        if (response.status === 200){
            setAuthTokens(data)
            setAdmin(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))

            if (admin.is_admin) {
                console.log(authTokens,'iddddd');
                navigate('/admin/dashboard')
               
            } else {
                console.log('aaaaa');
                setAuthTokens(null)
                setAdmin(null)
                localStorage.removeItem('authTokens')
                Swal.fire("Error","Invalid credentials")
               
            }
        }
        else{
            Swal.fire("Error","Invalid credentials")
        }
    }

    let logoutAdmin = ()=>{

        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Logout ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton:true
        }).then((result)=>{
            if (result.isConfirmed) {
                setAdmin(null)
                setAuthTokens(null)
                console.log('ppopop');
                localStorage.removeItem('authTokens')
                navigate('/admin/login')
            }
        })
        
    }


    let updateToken = async ()=>{

        let response = await fetch('http://127.0.0.1:8000/myadmin/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()

        if (response.status === 200) {
            console.log('updated ');
            setAuthTokens(data)
            setAdmin(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            
        } else {
            console.log('not updated');
            logoutAdmin()
            
        }

        if (loading) {
            setLoading(false)
        }
    }

    useEffect(()=>{

        if (loading) {
            updateToken()
        }
        let fourMinutes = 1000 * 60 * 4
        let intervel = setInterval(()=>{
            if (authTokens) {
                console.log('function called');
                updateToken()
            }
        }, fourMinutes)

        return ()=> clearInterval(intervel)
    }, [authTokens,loading])


    let contextData = {
        admin:admin,
        authTokens:authTokens,
        loginAdmin:loginAdmin,
        logoutAdmin:logoutAdmin
    }


    return(
        <AuthAdminContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthAdminContext.Provider>
    )

    
}