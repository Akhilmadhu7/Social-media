import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Header from "./Header";
import AuthContext, { AuthProvider } from "../../context/UserAuthContext";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/";


function Post() {

  let {user, authTokens} = useContext(AuthContext)
  const [postData, setPostData] = useState([])
  let data = user.username
  useEffect(()=>{
 
    console.log('daaaaaaa',data);
    console.log('typee',typeof(data));
    try {
      Axios.get(baseUrl+'accounts/posts',{
        headers:{
          Authorization:`Bearer ${authTokens.access}`,
          "Content-type": "application/json",
        }
      }).then((res)=>{
         console.log('postsss',res.data.Data);
         setPostData(res.data.Data)
      })
    } catch (error) {
      
    }
  },[])
 
  return (
    <div className="pb-8"> 
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-8 bg-white">
        
        <div className="text-center pb-12">
          {/* <h2 className="text-base font-bold text-indigo-600">
            We have the best equipment in the market
        </h2> */}
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
            Posts
          </h1>
          <hr />
        </div>
        {postData !== [] ? 
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {postData.map((post)=>{
            return(


              <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full h-full md:h-64">
              <img
                className="object-center object-cover w-full h-full "
                src={post.post_image}
                // src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt="photo"
              />
            </div>
          </div>

            )
          })}
          
         
        </div>
        : <p>No post yet</p> }
       
     
      </section>
       
    </div>
  );
}

export default Post;
