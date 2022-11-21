import React from "react";
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/accounts/"

function FriendsSuggestion() {

  let {authTokens,user} = useContext(AuthContext)
  const navigate = useNavigate()
  const [newFriends, setNewFriends] = useState([])
  const [follow, setFollow] = useState([])

  useEffect(()=>{
    // try {
    //   Axios.get(baseUrl+"new-friends",{
    //     headers:{
    //       Authorization:`Bearer ${authTokens.access}`,
    //       'content-type':'application/json'
    //     }
    //   }).then((res)=>{
    //     console.log('result',res.data.Response);
    //     setNewFriends(res.data.Response)
    //   }).catch((err)=>{
    //     console.log('err',err);
    //   })
    // } catch (error) {
      
    // }
    newfriends(baseUrl+"new-friends")
  },[])

  function newfriends(url){
    try {
      Axios.get(url,{
        headers:{
          Authorization:`Bearer ${authTokens.access}`,
          'content-type':'application/json'
        }
      }).then((res)=>{
        console.log('result',res.data);
        setNewFriends(res.data.Response)
      }).catch((err)=>{
        console.log('err',err);
      })
    } catch (error) {
      
    }
  }

  

  const findProfile = (username)=>{
    console.log('here is the id',username);
    navigate("/user/friend-profile/"+username)
  }


  const followUser=(username)=>{
    // let data={username : user.username,
    //   follower : id}
    try {
      // console.log('daataaaa',data);
          Axios.post(baseUrl+'follow',{follower:user.user_id,username:username},{
              headers:{
                  Authorization:`Bearer ${authTokens.access}`,
                  // 'content-type':'application/json'
              }
          }).then((res)=>{
              if (res) {
                  Axios.get(baseUrl + "friends-profile/"+username,{
                    headers:{
                        Authorization:`Bearer ${authTokens.access}`,
                        'content-type':'application/json'
                    }
                }).then(res=>{
                  console.log('folllllllw',res.data);
                  setFollow(res.data.follow)
                })
                  
              }
          }).catch(err=>{
              console.log('errer fol',err);
          })
      } catch (error) {
          console.log('foll err',error.data);
      }
  }
newFriends.map((f)=>{
  if (f.username==='sangeeth' in follow) {
    console.log('following');
  } else {
    console.log('follow');
  }
})


  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      
    {newFriends.map((friends)=>{

      return(
      <div className="main bg-white grid place-items-center ">
       
        <div className="card bg-white flex flex-col items-center justify-center p-2 sm:p-4 shadow-lg rounded-2xl w-[9rem]  sm:w-64">
        
          <div className="profile mx-auto rounded-full py-2 w-8 sm:w-16">
            <img
              src={friends.profile_pic}
              // src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full"
              alt="profile"
            />
          </div>
        
          <div className="name text-gray-800 text:sm sm:text-2xl font-medium mt-4 hover:cursor-pointer"
          onClick={()=>findProfile(friends.username)}>
            <p>{friends.username}</p>
          </div>
          
          <div className="username text-gray-500">
            <p>{friends.full_name}</p>
          </div>
       
          <div className="work text-gray-700 sm:mt-2 mt-4">
            <p>Front-end developer 🧑‍💻</p>
          </div>
         
          <div className="w-full mt-4 sm:mt-8">
            <button 
              onClick={()=>followUser(friends.username)}
              className="bg-blue-500 py-2 px-2 sm:px-4 hover:bg-blue-600 text-white w-full cfont-semibold rounded-lg shadow-lg">
              {/* {follow.following ? 'following' : 'follow'} */}
              {follow.followinguser ? follow.followinguser : 'follow'}
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
