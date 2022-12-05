// import { HeartIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import AuthContext from "../../context/UserAuthContext";
import Axios from "axios";
import { MdOutlineDeleteForever } from "react-icons/md";

const baseUrl = "http://127.0.0.1:8000/accounts/";

const SinglePost = ({
  like,
  setSingleModal,
  allPost,
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
  const [deleteModal, setDeleteModal] = useState(false);

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
        singlePost(id);
        setComment("");
        // commentHandler(id);
      });
    } catch (error) {}
  };

  const deleteComment = (id) => {
    try {
      Axios.delete(baseUrl + "show/" + id, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      }).then((res) => {
        console.log("deleted", res.data);
        singlePost(singleData.id);
      });
    } catch (error) {
      console.log("delete error");
    }
  };

  const handlerDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const deletePost = (id) => {
    console.log("here is the post id",id);
    try {
        Axios.delete(baseUrl+'singlepost/'+id,{
            headers:{
                Authorization:`Bearer ${authTokens.access}`
            }
        }).then((res)=>{
            console.log('here is the response');
            setDeleteModal(!deleteModal);
            setSingleModal(false)
            allPost()
        })
    } catch (error) {
        
    }
  };

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
            {user.username === singleData.user.username && (
              <div className=" ">
                <button
                  onClick={handlerDeleteModal}
                  className="block text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Delete Post
                </button>
              </div>
            )}

            {deleteModal && (
              <div
                className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
                // style="background-image: url(https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1582&q=80);"
                id="modal-id"
              >
                <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                  <div className="">
                    <div className="text-center p-5 flex-auto justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 flex items-center text-red-500 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                      <p className="text-sm text-gray-500 px-8">
                        Do you really want to delete your account? This process
                        cannot be undone
                      </p>
                    </div>

                    <div className="p-3  mt-2 text-center space-x-4 md:block">
                      <button
                        onClick={()=>deletePost(singleData.id)}
                        className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={handlerDeleteModal}
                        className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                    <div className="w-[2rem] r"></div>
                    <img
                      className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      src={comment.user.profile_pic}
                      alt=""
                    />
                  </div>
                  <div className="w-full  ">
                    <p className="text-black text-left text-[10px]">
                      <span
                        className="text-main text-[13px] cursor-pointer"
                        onClick={() => findProfile(comment.username)}
                      >
                        {comment.user.username}
                      </span>
                      <span className="ml-6 text-[15px]">
                        {comment.comment}
                      </span>
                    </p>

                    <p className="text-main text-[8px] "></p>
                  </div>
                  <div className="text-center flex">
                    <div>
                      {user.username === comment.user.username ? (
                        <MdOutlineDeleteForever
                          className="text-black hover:cursor-pointer hover:text-red-500"
                          onClick={() => deleteComment(comment.id)}
                          // className={`w-3 ${singleData ? 'text-main' : 'text-white'} cursor-pointer`} onClick={() => {
                          //   console.log(singleData.likes_no.includes(singleData.likes_no), "hello like");
                          //   CommentlikeHandler(singleData.id,  singleData.id)
                          // }}
                        />
                      ) : null}
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
                    className="w-full px-2 bg-red-500 text-black border-transparent bg-transparent outline-none h-full"
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
