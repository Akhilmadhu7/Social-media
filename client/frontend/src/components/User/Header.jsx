import React from "react";
import AuthContext from "../../context/UserAuthContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserAlt,
  FaHome,
  FaFacebookMessenger,
  FaUserFriends,
  FaSearch,
} from "react-icons/fa";
import { IoMdAddCircle, IoMdNotifications ,IoMdLogOut} from "react-icons/io";

function Header() {
  let { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchValue: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const searchUser = () => {
    console.log();
    if (searchData.searchValue) {
      console.log("aaa", searchData);
      navigate("/searchuser/" + searchData.searchValue);
    }
  };

  return (
    <div className=" sticky top-0">
      <nav className="bg-indigo-800 border-gray-200 px-2 sm:px-4 py-2.5   dark:bg-gray-900 w-full">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/home" className="flex items-center">
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
              <li>
                <Link to="/home">
                  <a
                    className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    // onClick={() => navigate("/user/home")}
                  >
                    <FaHome className="text-white" size="20px" />
                  </a>
                </Link>
              </li>
              <li>
                <a
                  className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => {
                    navigate("/friends-suggestion");
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
                <Link to="/profile">
                  <a
                    className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    onClick={() => navigate("/user/profile/posts")}
                  >
                    <FaUserAlt className="text-white" size="20px" />
                  </a>
                </Link>
                
              </li>

              <li className="">
                <Link onClick={logoutUser} >
                  <a
                    className="block py-2 pr-4 pl-3 cursor-pointer text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    
                  >
                    <IoMdLogOut className="text-white rotate-[270deg]" size="20px" />
                  </a>
                </Link>
                
              </li>
            </ul>
          </div>
        </div>
        <i className="fab fa-wolf-pack-battalion"></i>
      </nav>

      
    </div>
  );
}

export default Header;
