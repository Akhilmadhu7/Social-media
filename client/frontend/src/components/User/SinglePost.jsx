// import { HeartIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import AuthContext from "../../context/UserAuthContext";
import Axios from "axios";
import {MdOutlineDeleteForever} from 'react-icons/md'

const baseUrl = "http://127.0.0.1:8000/accounts/";

const SinglePost = ({
  like,
  setSingleModal,
  singlePost,
  singleData,
  commentData,
}) => {
  let { user, authTokens } = useContext(AuthContext);
  console.log("sinlepost worked", singleData.post_image);
  console.log("comments here", commentData);
  const navigate = useNavigate();

  const [allComment, setAllComment] = useState([]);
  const [comment, setComment] = useState([]);

  const likeHandler = (likes, id) => {
    let data = {
      id: id,
      likes_no: likes + 1,
      liked_user: user.username,
      user: user.user_id,
    };
    try {
      Axios.patch(baseUrl + "home", data, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          singlePost(id);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const findProfile = (username) => {
    if (username === user.username) {
      console.log("usernauseruser", username);
      setSingleModal(false);
      navigate("/user/profile");
    } else {
      console.log("else else", username);
      setSingleModal(false);
      navigate("/user/friend-profile/" + username);
    }
  };


  const addComment = (id) => {
    let data = {
      username: user.username,
      comment: comment,
      post_id: id,
    };
    try {
      Axios.post(baseUrl + "comment", data, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          // "Content-type": "applicaion/json",
        },
      }).then((res) => {
        console.log("comment res", res);
        singlePost(id);
        setComment('')
        // commentHandler(id);
      });
    } catch (error) {}
  };

  const deleteComment = (id)=>{
    try {
        Axios.delete(baseUrl+'show/'+id,{
            headers:{
                Authorization:`Bearer ${authTokens.access}`
            }
        }).then((res)=>{
            console.log('deleted',res.data);
            singlePost(singleData.id);
        })
    } catch (error) {
        console.log('delete error');
    }
  }



  return (
    <div className="text-white absolute flex justify-center items-center bottom-0 top-0 right-0  left-0 duration-1000 backdrop-blur-sm duration h-screen w-screen z-10">
      <div className="text-white w-[60rem] bg-secondary h-[30rem] flex shadow-xl">
        <div className="w-1/2 ">
          <div className="w-full h-full flex justify-center items-center overflow-hidden ">
            <img
              src={singleData.post_image}
              className="w-auto py-5"
              alt="Free unsplash image"
            />
          </div>
        </div>
        <div className="w-1/2 bg-dark flex flex-col justify-between px-5 py-3 bg-slate-100">
          <div className="flex justify-between h-[3rem] ">
            <p className="text-main text-black" onClick={() => {}}>
              Comments
            </p>
            <IoMdClose
              className="w-8 hover:text-main text-indigo-600 cursor-pointer "
              onClick={() => {
                setSingleModal(false);
              }}
            />
          </div>
          <div className=" overflow-y-scroll ">
            {commentData?.map((comment) => {
              return (
                <div className=" flex items-center border-y gap-3 p-3 ">
                  <div className="pb-1">
                    <div className="w-[2rem] rounded-full border-main border-[1px] bg-indigo-500 h-[2rem]"></div>
                    {/* <img src={comment.} alt="" /> */}
                  </div>
                  <div className="w-full  ">
                    <p className="text-black text-left text-[10px]">
                      <span
                        className="text-main text-[13px] cursor-pointer"
                        onClick={() => findProfile(comment.username)}
                      >
                        {comment.username}
                      </span>
                      <span className="ml-6 text-[15px]">{comment.comment}</span>
                    </p>

                    <p className="text-main text-[8px] "></p>
                  </div>
                  <div className="text-center flex">
                    <div>{user.username === comment.username ? 
                      <MdOutlineDeleteForever className="text-black hover:cursor-pointer hover:text-red-500"
                      onClick={()=>deleteComment(comment.id)}
                      // className={`w-3 ${singleData ? 'text-main' : 'text-white'} cursor-pointer`} onClick={() => {
                      //   console.log(singleData.likes_no.includes(singleData.likes_no), "hello like");
                      //   CommentlikeHandler(singleData.id,  singleData.id)
                      // }}
                      />: null}
                      <p className="text-[7px] text-slate-300"></p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-[3rem] flex flex-col ">
            <div className=" flex items-center my-auto gap-x-2">
              <FaHeart
                className={`w-8 ${
                  singleData.is_liked ? "text-red-500" : "text-white"
                } cursor-pointer`}
                //   className={`w-5 ${singleData?.includes(singleData) ? 'text-main' : 'text-red-500'}  text-red-600 cursor-pointer`}
                onClick={() => {
                  likeHandler(singleData.likes_no, singleData.id);
                }}
              />{" "}
              <p className="text-[10px] pl-1 text-black">
                {singleData && singleData.likes_no}
              </p>
              <div className=" h-[50px] w-[450px] border-indigo-500 border-[2px] bg-white rounded-l-3xl rounded-r-3xl">
              <div className="-[96%] w-full h-full ">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  className="w-full bg-red-500 text-black border-transparent bg-transparent outline-none h-full"
                />
              </div>
              </div>
              <div className="ml-auto  px-2">
                <button
                  onClick={() => addComment(singleData.id)}
                  className="text-indigo-600"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
