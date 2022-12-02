import React from "react";
import { useContext, useEffect, useState } from "react";
import { FaRegPaperPlane, FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import Axios from "axios";
import {MdOutlineDeleteForever} from 'react-icons/md'

import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/accounts/";
function Home() {
  let { user, authTokens } = useContext(AuthContext);
  const [feeds, setFeeds] = useState([]);
  const [allComment, setAllComment] = useState([]);
  const [comment, setComment] = useState([]);
  const [commentModal, setCommentModal] = useState({id:'',status:false});
  const navigate = useNavigate();
  console.log("hoekasdj");

  useEffect(() => {
    feed(baseUrl);
  }, []);

  function feed(url) {
    try {
      Axios.get(url + "home", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-type": "",
        },
      })
        .then((res) => {
          console.log("res", res.data);
          setFeeds(res.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  }

  function likePost(id, likes) {
    let data = {
      id: id,
      likes_no: likes + 1,
      liked_user: user.username,
      user: user.user_id,
    };
    try {
      Axios.patch(baseUrl + "home", data, {
        heades: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("liked res", res.data);
          feed(baseUrl);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  }

  const findProfile = (username) => {
    if (username === user.username) {
      console.log("usernauseruser", username);
      navigate("/user/profile");
    } else {
      console.log("else else", username);
      navigate("/user/friend-profile/" + username);
    }
  };

  const showCommentModal = (id)=>{
    if (commentModal.status === true) {
      setCommentModal({
        id:'',
        status:false
      })
    } else {
      setCommentModal({
        id:id,
        status:true
      })
      commentHandler(id)
    }
    
  }

  function commentHandler(id) {
    // setCommentModal(!commentModal);
    try {
      Axios.get(baseUrl + "show/" + id, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      }).then((res) => {
        // setCommentModal(!commentModal)
        console.log("comment data", res);
        setAllComment(res.data);
      });
    } catch (error) {}
  }

  console.log("comments here", allComment);

  const addComment = (id) => {
    let data = {
      user: user.user_id,
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
        commentHandler(id);
        setComment('')
      });
    } catch (error) {}
  };

  const setModal = () => {
    console.log("hello modal");
    setCommentModal(!commentModal);
  };


  const deleteComment = (id,post_id)=>{
    try {
      Axios.delete(baseUrl+'show/'+id,{
        headers:{
          Authorization:`Bearer ${authTokens.access}`
        }
      }).then((res)=>{
        console.log('comment deleted',res.data);
        commentHandler(post_id)
      })
    } catch (error) {
      console.log('error',error);
    }
  }
  


  return (
    <div>
      {feeds
        ? feeds.map((feed) => {
            return (
              <div className=" bg-white">
                <div className="flex">
                  <div className="">
                    {feed.user.profile_pic  ? 
                    <img
                      src={feed.user.profile_pic}
                      // src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      className="rounded-full w-8 sm:w-16  m-2 "
                      alt="Avatar"
                    /> :
                    <svg className="w-12 h-12 text-gray-400  rounded-full m-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
            }
                  </div>
                  <div
                    className=" sm:mt-2 p-3 hover:cursor-pointer"
                    onClick={() => findProfile(feed.user.username)}
                  >
                    <h2 className="  md:text-xl">{feed.user.username} </h2>
                  </div>
                </div>

                <div className="flex justify-center mb-5 ">
                  <div className="rounded-lg shadow-lg bg-white w-full flex flex-col items-center">
                    <div  className="h-auto w-full md:h-[500px]"> 

                      <img className=" h-auto w-full md:h-full" src={feed.post_image} alt="" />
                    </div>

                    <div className="flex bg-gren-400 w-full">
                      <button
                        onClick={() => likePost(feed.id, feed.likes_no)}
                        className="my-2 ml-2  sm:m-4 bg-yllow-400"
                        type="submit"
                      >
                        {feed.is_liked ? (
                          <IoMdHeart className="sm:h-8 w-8 text-red-500" />
                        ) : (
                          <FaRegHeart className="sm:h-8 w-8 text-black" />
                        )}
                      </button>
                      <button
                        onClick={() => showCommentModal(feed.id)}
                        className="my-2 ml-2  sm:m-4 bg-idigo-400"
                        type="submit"
                      >
                        <FaRegComment
                          // onClick={()=>commentHandler(feed.id)}
                          className="sm:h-8 w-8"
                        />
                      </button>
                      <button
                        className="my-2 ml-2  sm:m-4 bg-rd-400 "
                        type="submit"
                      >
                        <FaRegPaperPlane className="sm:h-8 w-8 " />
                      </button>
                    </div>
                    <div className="w-full pl-5">
                      <p className="text-left text-base sm:text-xl">
                        {feed.likes_no !== 0 ? (
                          <p>{feed.likes_no} Likes</p>
                        ) : (
                          <p>Like</p>
                        )}
                      </p>
                    </div>

                    <div className="w-full pl-5">
                      {/* <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5> */}
                      <p class="text-gray-700 text-left text-xs sm:text-base">
                        {feed.caption}
                      </p>
                      <p className="text-gray-700 text-left text-xs sm:text-base mb-4">
                        {format(feed.created_at)}
                      </p>
                      {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
                    </div>

                    {commentModal.id == feed.id && commentModal.status == true && (
                      <div class="antiliased mx-uto bg-gry-100  mb-3 w-full px-4">
                        <h3 class="mb-4 text-lg font-semibold text-gray-900">
                          Comments
                        </h3>

                        <div class="space-y-4 h-[200px] md:h-[300px] overflow-y-scroll">
                          {allComment.map((commemts) => {
                            return (
                              <div class="flex">
                                <div class="flex-shrink-0 mr-3">
                                  <img
                                    className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                    src={commemts.user.profile_pic}
                                    // src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                    alt="Profile picture"
                                  />
                                </div>
                                <div className="flex-1 text-left border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                  <strong>{commemts.user.username}</strong>{" "}
                                  <div className="content-end">
                                  {user.username === commemts.user.username ? 
                                    <MdOutlineDeleteForever className="text-black hover:cursor-pointer hover:text-red-500"
                                    onClick={()=>deleteComment(commemts.id,feed.id)}
                                    
                                    />: null}
                                  </div>
                                  
                                  <span class="text-xs text-gray-400">
                                  {/* {format(comment.comment_date)} */}
                                  {/* {comment.created_at} */}
                                  </span>
                                  <p class="text-sm">{commemts.comment}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="pb-2 pt-4 bg-white">
                          <div className="flex items-center h-[50px] border-indigo-500 border-[2px] bg-gray-100 rounded-l-3xl rounded-r-3xl">
                            <div className="w-[70px] h-[70px] rounded-full overflow-hidden relative left-[-10px]">
                              {/* <img
                                 className="rounded-full"
                                 src={`${
                                   "/images/" +
                                   "https://images.unsplash.com/photo-1534105555282-7f69cbee08fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                                 }`}
                                 alt=""
                               /> */}
                            </div>
                            <div className="w-[90%] h-full">
                              <input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                type="text"
                                className="w-full border-transparent bg-transparent outline-none h-full"
                              />
                            </div>
                            <div className="ml-auto  px-2">
                              <button
                                onClick={() => addComment(feed.id)}
                                className="text-indigo-600"
                              >
                                Post
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : null}

      {/* className={`mt-4 transition ease-in-out delay-150 max-h-[300px] ${allComments.length > 3 ? 'overflow-y-scroll scrollbar-hide-comment' : ''}`} */}
    </div>
  );
}

export default Home;
