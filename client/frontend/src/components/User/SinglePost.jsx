// import { HeartIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import React, {useContext} from 'react'
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import {IoMdClose } from "react-icons/io";
import AuthContext from '../../context/UserAuthContext';
import Axios from 'axios'

const baseUrl = "http://127.0.0.1:8000/accounts/";

// import { format } from 'timeago.js'
// singlemodal={singleModal} singlePost={singlePost} singleData={singleData}

const SinglePost = ({like, setSingleModal, singlePost, singleData }) => {

  let {user,authTokens} = useContext(AuthContext)
  console.log('sinlepost worked',singleData.post_image);
  const navigate = useNavigate()

  const likeHandler = (likes,id)=>{
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
          singlePost(id)
        }).catch((err)=>{
          console.log('err',err);
        })
      } catch (error) {
        console.log('error',error);
      }

  }
  
  const CommentlikeHandler = ()=>{

  }
  


  return (
    <div className='text-white absolute flex justify-center items-center bottom-0 top-0 right-0  left-0 duration-1000 backdrop-blur-sm duration h-screen w-screen z-10'>
      <div className='text-white w-[60rem] bg-secondary h-[30rem] flex shadow-xl'>
        <div className='w-1/2 '>
          <div className='w-full h-full flex justify-center items-center overflow-hidden '>
            <img src={singleData.post_image} className='w-auto py-5' alt="Free unsplash image" />
          </div>
        </div>
        <div className='w-1/2 bg-dark flex flex-col justify-between px-5 py-3 bg-slate-100'>
          <div className='flex justify-between h-[3rem] ' >
            <p className='text-main text-black' onClick={() => {
             
            }}>Comments</p>
            <IoMdClose className='w-8 hover:text-main text-indigo-600 cursor-pointer ' onClick={() => {
              setSingleModal(false)
            }} />
          </div>
          <div className='h-full pt-5 pl-6 '>
           
                  <div className=' flex items-center gap-3 pb-4  ' >
                    <div className='pb-1'>
                      <div className='w-[2rem] rounded-full border-main border-[1px] bg-secondary h-[2rem]' ></div>
                    </div>
                    <div className='w-full '>
                        <p className='text-white text-[10px]'><span className='text-main text-[15px] cursor-pointer' 
                        >
                    </span> 
                    </p>

                      <p className='text-main text-[8px] '>
                       
                        </p>
                    </div>
                    <div className='text-center flex'>

                      <div>
                        <FaHeart 
                        // className={`w-3 ${singleData ? 'text-main' : 'text-white'} cursor-pointer`} onClick={() => {
                        //   console.log(singleData.likes_no.includes(singleData.likes_no), "hello like");
                        //   CommentlikeHandler(singleData.id,  singleData.id)
                        // }} 
                        />
                        <p className='text-[7px] text-slate-300'></p>
                      </div>
                    </div>
                  </div>
               

          </div>
          <div className='h-[3rem] flex flex-col '>
            <div className=' flex items-center'>
              <FaHeart
               className={`w-8 ${like.like ? 'text-red-500' : 'text-white'} cursor-pointer`}
            //   className={`w-5 ${singleData?.includes(singleData) ? 'text-main' : 'text-red-500'}  text-red-600 cursor-pointer`}
              onClick={() => {
                likeHandler(singleData.likes_no, singleData.id)
              }} 
              /> <p className='text-[10px] pl-1 text-black'>{singleData && singleData.likes_no}</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost