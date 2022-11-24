import React from "react";
import AuthContext from "../../context/UserAuthContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  FaUserAlt,
  FaHome,
  FaFacebookMessenger,
  FaUserFriends,
  FaSearch,
} from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";
import {IoMdPhotos, IoMdNotifications, IoMdLogOut } from "react-icons/io";

const baseUrl = "http://127.0.0.1:8000/accounts/";
// "http://127.0.0.1:8000/accounts/posts"

function Header() {

  let { user, logoutUser, authTokens } = useContext(AuthContext);
  const [modalPost, setModalPost] = useState(false)
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchValue: "",
  });
  const [postData,setPostData] = useState({
    caption:"",
    post_image:"",
    user:user.user_id
  })

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostChange = (e)=>{
    console.log('postss',e.target.value);
    setPostData({
      ...postData,
      [e.target.name]:e.target.value,
    });
  };

  const handlePostImage = (e)=>{
    setPostData(URL.createObjectURL(e.target.files[0]))
    console.log('[stimfa',e.target.name,e.target.value);
    setPostData({
      ...postData,
      post_image: e.target.files[0]
    })
  }

  const searchUser = () => {
    console.log();
    if (searchData.searchValue) {
      console.log("aaa", searchData);
      navigate("/user/searchuser/" + searchData.searchValue);
    }
  };

  const uploadPost = (e) => {
    e.preventDefault()
    console.log('post Data',postData);
    try {
      Axios.post(baseUrl + "posts", postData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "multipart/form-data",
        }
      }).then((res) => {
        if (res) {
          console.log('post resp', res.data);
        setModalPost(!modalPost);
        }
        
      }).catch((err) => {
        console.log('post errrr', err);
      });
    } catch (error) {
      console.log('errors', error);
    }
  }

  return (
    <div className=" sticky top-0">
      <nav className="bg-indigo-800 border-gray-200 px-2 sm:px-4 py-2.5   dark:bg-gray-900 w-full">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/user/home" className="flex items-center">
            <img src="" className="mr-3 h-6 sm:h-9" alt="" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Brand
            </span>
          </Link>

          <div className="pl-32 gap-2 hidden sm:flex">
            <form>
              <input
                onChange={handleChange}
                type="search"
                name="searchValue"
                placeholder="Search"
                className="px-4 py-2 rounded-md "
              />
            </form>
            <button
              className="bg-white text-indigo px-4 py-2 rounded-md"
              onClick={searchUser}
            >
              <FaSearch />
            </button>
          </div>
          <div className=" w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex sm:gap-6 p-4 mt-4  rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 justify-evenly">
              <li onClick={()=>setModalPost(!modalPost)}>
                
                  <a
                    className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    // onClick={() => navigate("/user/home")} BiMessageSquareAdd
                  >
                    <BiMessageSquareAdd className="text-white" size="20px" />
                  </a>
                
              </li>

              <li>
                <Link to="/user/home">
                  <a
                    className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    // onClick={() => navigate("/user/home")} BiMessageSquareAdd
                  >
                    <FaHome className="text-white" size="20px" />
                  </a>
                </Link>
              </li>
              <li>
                <a
                  className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => {
                    navigate("/user/friends-suggestion");
                  }}
                >
                  <FaUserFriends className="text-white" size="20px" />
                </a>
              </li>
              {/* <li>
                                <a className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" ><IoMdAddCircle size="20px" /></a>
                            </li> */}
              <li>
                <a
                  className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => {
                    navigate("/user/message");
                  }}
                >
                  <FaFacebookMessenger className="text-white" size="20px" />
                </a>
              </li>
              <li>
                <a
                  className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => navigate("/user/notification")}
                >
                  <IoMdNotifications className="text-white" size="20px" />
                </a>
              </li>
              <li className="">
                <Link to="/user/profile">
                  <a
                    className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={() => navigate("/user/profile/posts")}
                  >
                    <FaUserAlt className="text-white" size="20px" />
                  </a>
                </Link>
              </li>

              <li className="">
                <Link onClick={logoutUser}>
                  <a className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <IoMdLogOut
                      className="text-white rotate-[270deg]"
                      size="20px"
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <i className="fab fa-wolf-pack-battalion"></i>
      </nav>

      {/* Modal for upload post */}

      {modalPost && 

      <div
        id="popup-modal"
        tabindex="-1"
        class="overflow-y-auto ml-32  fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center"
        aria-hidden="true"
      >
        <div class="relative ml-96 mt-52 w-full max-w-md h-full md:h-auto">
          <div class="relative bg-white rounded-lg shadow ">
            <form action=""  onSubmit={uploadPost}>
            <button
              onClick={() => {
                setModalPost(!modalPost)
              }}
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
              <h1 class="mb-5 text-3xl font-normal underline text-gray-500 dark:text-gray-400 px-24 ">
                <IoMdPhotos size="200px" />
              </h1>

              <div className="pl-16 flex flex-col">
                <textarea
                  id="caption-address"
                  name="caption"
                  type="text"
                  placeholder="Add Caption to the post"
                  onChange={handlePostChange}
                  autocomplete="text"
                  class=" w-5/6 h-20 relative rounded-xl block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />

                <label
                  htmlFor="fileUpload"
                  class="w-3/4 ml-4 text-center text-white bg-indigo-600 hover:bg-indigo-700  font-medium rounded-lg text-sm  px-5 py-2 mt-2"
                >
                  Upload Image
                </label>
                <input
                
                  id="fileUpload"
                  name="post_image"
                  type="file"
                  placeholder="imageupload"
                  onChange={handlePostImage}
                  autocomplete=""
                  required
                  class="hidden w-5/6 h-10 bg-white relative rounded-xl block w-full appearance-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />



            {/* <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      image
                    </label>
                    <input
                   
                      onChange={handlePostImage}
                      type="file"
                      name="post_image"
                    
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    /> */}




              </div>
              <button
               
                data-modal-toggle="popup-modal"
                type="submit"
                class="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 mt-2"
              >
                Upload Post
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
}
{/* Modal end */}
    </div>
  );
}

export default Header;
