import { createContext, useState, useEffect } from "react";
import {json, Link, useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import Swal from "sweetalert2";

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {

    const navigate = useNavigate()

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let loginUser = async (e) =>{
        
        e.preventDefault()
       
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST', 
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })

        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/home')
        } 
        else{
            console.log('response',response);
            Swal.fire("Error","Invalid credentials")
        }
    }
    if (user) {
        console.log('is logggggg',user.is_logged);
    }

    let logoutUser = ()=>{

        Swal.fire({
            title: 'Confirm!',
            text: 'Do you want to Logout ?',
            icon: 'info',
            confirmButtonText: 'Logout',
            showCancelButton:true
        }).then((result)=>{
            if (result.isConfirmed) {
                setUser(null)
                setAuthTokens(null)
                localStorage.removeItem('authTokens')
                navigate('/')
            }
        })
        
    }


    let updateToken = async ()=>{
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/JSON'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()

        if (response.status === 200){
            console.log('fhfjhf');
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }
        else{
            console.log('llll');
            logoutUser()
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
                updateToken()
            }
        }, fourMinutes)
        
        return ()=> clearInterval(intervel)

    }, [authTokens, loading])


    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}

        </AuthContext.Provider>
    )
}