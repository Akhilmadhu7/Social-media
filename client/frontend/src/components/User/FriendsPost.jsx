import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import {  useParams } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/";

function FriendsPost() {

  let {user, authTokens} = useContext(AuthContext)
  let {userdata} = useParams()
  let [userPost,setUserPost] = useState({
    username:""
  })
  const [postData, setPostData] = useState([])
  let data = {username:userdata}
  useEffect(()=>{
    console.log('gggggggggggg',data,userdata);
    setUserPost(userdata)
    try {
      Axios.get(baseUrl+'accounts/userpost/'+userdata,{
        headers:{
          Authorization:`Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        }
      }).then((res)=>{
         console.log('postsss',res.data.Data);
         setPostData(res.data.Data)
      })
    } catch (error) {
      
    }
  },[])


  return (
    <div > 
        {postData? 
        postData.map((post)=>{
            return(

            
      <div className="pb-4">
        
        <div className="px-3 py-2 max-w-2xl mx-auto mt-2 bg-white">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-xl font-heading text-gray-900">
                Posts
            </h1>
          <div class="grid grid-cols-3 gap-2 my-3">
            <img
              class="block bg-center bg-no-repeat bg-cover  w-full h-full rounded-lg"
              src={post.post_image}
            //   src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg"
              alt=""
            />
           
           

            
           {/* <img
              class="block bg-center bg-no-repeat bg-cover w-full h-full rounded-lg"
              src="https://bd.gaadicdn.com/processedimages/ducati/panigale-v4/640X309/panigale-v4630ca386c0988.jpg?tr=w-300"
              alt=""
            /> */}
          </div>
        </div>
      </div>
      )
    })
      : <p>No post yet</p>}
    </div>
  );
}

export default FriendsPost;
