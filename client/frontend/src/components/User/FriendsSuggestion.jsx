import React from "react";
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/accounts/new-friends"

function FriendsSuggestion() {

  let {authTokens} = useContext(AuthContext)
  const navigate = useNavigate()
  const [newFriends, setNewFriends] = useState([])

  useEffect(()=>{
    try {
      Axios.get(baseUrl,{
        headers:{
          Authorization:`Bearer ${authTokens.access}`,
          'content-type':'application/json'
        }
      }).then((res)=>{
        console.log('result',res.data.Response);
        setNewFriends(res.data.Response)
      }).catch((err)=>{
        console.log('err',err);
      })
    } catch (error) {
      
    }
  },[])


  const findProfile = (id)=>{
    console.log('here is the id',id);
    navigate("/friend-profile/"+id)
  }


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      
    {newFriends.map((friends)=>{

      return(
      <div className="main bg-white grid place-items-center ">
       
        <div className="card bg-white flex flex-col items-center justify-center p-2 sm:p-4 shadow-lg rounded-2xl w-[9rem]  sm:w-64">
        
          <div className="profile mx-auto rounded-full py-2 w-8 sm:w-16">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full"
              alt="profile"
            />
          </div>
        
          <div className="name text-gray-800 text:sm sm:text-2xl font-medium mt-4 hover:cursor-pointer"
          onClick={()=>findProfile(friends.id)}>
            <p>{friends.username}</p>
          </div>
          
          <div className="username text-gray-500">
            <p>{friends.full_name}</p>
          </div>
       
          <div className="work text-gray-700 sm:mt-2 mt-4">
            <p>Front-end developer 🧑‍💻</p>
          </div>
         
          <div className="w-full mt-4 sm:mt-8">
            <button className="bg-blue-500 py-2 px-2 sm:px-4 hover:bg-blue-600 text-white w-full cfont-semibold rounded-lg shadow-lg">
              Follow
            </button>
          </div>
        </div>
      </div>
      )
   })}
      

      
    </div>
  );
}

export default FriendsSuggestion;
