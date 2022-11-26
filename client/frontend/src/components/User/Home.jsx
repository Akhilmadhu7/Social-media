import React from "react";
import { useContext, useEffect, useState } from "react";
import { FaRegPaperPlane, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/accounts/" 
function Home() {
  let { user, authTokens } = useContext(AuthContext);
  const [feeds, setFeeds] = useState([])
  const [commentModal, setCommentModal] = useState(false)
  const navigate = useNavigate()
  console.log("hoekasdj");

  useEffect(()=>{
    
    feed(baseUrl)
  },[])

  function feed(url){
    try {
      Axios.get(url+'home',{
        headers:{
          Authorization:`Bearer ${authTokens.access}`,
          'Content-type':''
        }
      }).then((res)=>{
        console.log('res',res.data);
        setFeeds(res.data)
      }).catch((err)=>{
        console.log('err',err);
      })
    } catch (error) {
      console.log('error',error);
    }
  }

  function likePost(id,likes){
    let data = {
      id:id,
      likes_no:likes+1,
      liked_user:user.username,
      user:user.user_id,

    }
    try {
      Axios.patch(baseUrl+'home',data,{
        heades:{
          Authorization:`Bearer ${authTokens.access}`,
          "Content-Type": "multipart/form-data",
        }
      }).then((res)=>{
        console.log('liked res',res.data);
        feed(baseUrl)
      }).catch((err)=>{
        console.log('err',err);
      })
    } catch (error) {
      console.log('error',error);
    }
  }

  const findProfile = (username)=>{
    if (username === user.username) {
      console.log('usernauseruser',username);
      navigate("/user/profile")
    } else {
      console.log('else else',username);
      navigate("/user/friend-profile/"+username)
    }
  }  


  return (
    <div>
      
      {feeds ? feeds.map((feed)=>{

      return(
      <div className=" bg-white">
        <div className="flex">
          <div className="">
            <img
              src={feed.user.profile_pic}
              // src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-8 sm:w-16  m-2 "
              alt="Avatar"
            />
          </div>
          <div className=" sm:mt-2 p-3 hover:cursor-pointer" onClick={()=>findProfile(feed.user.username)}> 
            <h2 className="  md:text-xl">{feed.user.username} </h2>
          </div>
        </div>

        <div className="flex justify-center mb-5 ">
          <div className="rounded-lg shadow-lg bg-white w-full flex flex-col items-center">
        
              <img className="w-full"
              src={feed.post_image}
                
                alt=""
              />
         
            <div className="flex bg-gren-400 w-full">
              <button onClick={()=>likePost(feed.id,feed.likes_no)}        
              className="my-2 ml-2  text-red-500 sm:m-4 bg-yllow-400" type="submit">
                
                <FaRegHeart className="sm:h-8 w-8  text-" />
              </button>
              <button className="my-2 ml-2  sm:m-4 bg-idigo-400" type="submit">
                <FaRegComment className="sm:h-8 w-8" />
              </button>
              <button className="my-2 ml-2  sm:m-4 bg-rd-400 " type="submit">
                <FaRegPaperPlane className="sm:h-8 w-8 " />
              </button>
            </div>
            <div className="w-full pl-5"> 
            <p className="text-left text-base sm:text-xl">
              {feed.likes_no !== 0 ? <p>{feed.likes_no} Likes</p> : <p>Like</p>} 
              </p>

            </div>


            <div className="w-full pl-5">
              {/* <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5> */}
              <p class="text-gray-700 text-left text-xs sm:text-base  mb-4">
                {feed.caption}
                
              </p>
              {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
            </div>
          </div>
        </div>
      </div>)
      }): null}


      {}
      
    </div>
  );
}

export default Home;
