import React from "react";
import { useContext, useEffect, useState } from "react";
import { FaRegPaperPlane, FaRegComment, FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { format} from 'timeago.js';
import Axios from "axios";

import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/accounts/";
function Home() {
  let { user, authTokens } = useContext(AuthContext);
  const [feeds, setFeeds] = useState([]);
  const [comment,setComment] = useState([])
  const [commentModal, setCommentModal] = useState(false);
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

  
  function commentHandler(id){
    setCommentModal(!commentModal)
    let data = {
      username:user.username,
      post_id:id
    }
    try {
      Axios.get(baseUrl+'comment',data,{
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          // "Content-type": "applicaion/json",
        }
      }).then((res)=>{
        // setCommentModal(!commentModal)
        console.log('comment data',res);
      })
    } catch (error) {
      
    }
  }
  



  const addComment = (id)=>{
    let data = {
      username:user.username,
      comment:comment,
      post_id:id
    }
    try {
      Axios.post(baseUrl+'comment',data,{
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        // "Content-type": "applicaion/json",
      }
      }).then((res)=>{
        console.log('comment res',res);
      })
    } catch (error) {
      
    }
  }

  const setModal = () => {
    console.log("hello modal");
    setCommentModal(!commentModal);
  };

  return (
    <div>
      {feeds
        ? feeds.map((feed) => {
            return (
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
                  <div
                    className=" sm:mt-2 p-3 hover:cursor-pointer"
                    onClick={() => findProfile(feed.user.username)}
                  >
                    <h2 className="  md:text-xl">{feed.user.username} </h2>
                   
                  </div>
                </div>

                <div className="flex justify-center mb-5 ">
                  <div className="rounded-lg shadow-lg bg-white w-full flex flex-col items-center">
                    <img className="w-full" src={feed.post_image} alt="" />

                    <div className="flex bg-gren-400 w-full">
                      <button
                        onClick={() => likePost(feed.id, feed.likes_no)}
                        className="my-2 ml-2  sm:m-4 bg-yllow-400"
                        type="submit"
                      >{feed.is_liked ? 
                        <IoMdHeart className="sm:h-8 w-8 text-red-500"/>:
                        <FaRegHeart className="sm:h-8 w-8 text-black" />}
                      </button>
                      <button onClick={()=>commentHandler(feed.id)}
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
                      <p className="text-gray-700 text-left text-xs sm:text-base mb-4">{format(feed.created_at)}</p>
                      {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
                    </div>

                    {commentModal && (
                      <div class="antiliased mx-uto bg-gray-100  mb-3 max-w-screen-sm">
                        <h3 class="mb-4 text-lg font-semibold text-gray-900">
                          Comments
                        </h3>

                        <div class="space-y-4">
                          <div class="flex">
                            <div class="flex-shrink-0 mr-3">
                              <img
                                class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                                alt=""
                              />
                            </div>
                            <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                              <strong>Sarah</strong>{" "}
                              <span class="text-xs text-gray-400">3:34 PM</span>
                              <p class="text-sm">
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua.
                              </p>
                              
                            </div>
                          </div>
                        </div>
                      <div className="pb-2 pt-4 bg-white">
                        <div className="flex items-center h-[50px] border-indigo-500 border-[2px] bg-gray-200 rounded-l-3xl rounded-r-3xl">
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
                                 value={comment} onChange={(e) => setComment(e.target.value)}
                                 type="text"
                                 className="w-full border-transparent bg-transparent outline-none h-full"
                               />
                             </div>
                             <div className="ml-auto  px-2">
                               <button onClick={()=>addComment(feed.id)} className="text-indigo-600">Post</button>
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
