import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import AuthContext from "../../context/UserAuthContext";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/accounts/searchusers";

function SearchUsers() {
  let { authTokens } = useContext(AuthContext);
  const navigate = useNavigate()
  const [searchUser, setSearchUser] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);
  const [previousUrl, setPreviousUrl] = useState([]);
  const { search } = useParams();
  console.log("search", search);

  useEffect(() => {
    userSearch(baseUrl + "?search=");
  }, [search]);

  function userSearch(url) {
    try {
      Axios.get(url + search, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "content-type": "applicaiton/json",
        },
      })
        .then((res) => {
          console.log("newww", res);
          const { data } = res;
          setSearchUser(data);
          // setNextUrl(data.next)
          // setPreviousUrl(data.previous)
        })
        .catch((err) => {
          Swal.fire("Error", "Something went wrong");
        });
    } catch (error) {
      console.log("error", error);
    }
  }

  const findFriend = (username)=>{
    navigate("/user/friend-profile/"+username)

  }

  const paginationHandler = () => {
    console.log("hello ");
  };

  return (
    <div className="mt-8">
      <div class="max-w-2xl mx-auto">
        <div class="p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-betwen items-center mb-4">
            <h3 class="text-xl font-medium leading-none text-gray-900 dark:text-white">
              Search results related to
            </h3>
            <p className="ml-6">{search}</p>
          </div>
          <div class="flow-root">
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {searchUser.map((users, index) => {
                return (
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <img
                          class="w-8 h-8 sm:w-16 sm:h-16 rounded-full"
                          //   src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                          src={users.profile_pic}
                          alt="Neil image"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white hover:cursor-pointer" 
                          onClick={()=>findFriend(users.username)}>
                          {users.username}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          {users.full_name}
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-indigo-500 hover:text-indigo-600 dark:text-white">
                        View
                      </div>
                    </div>
                  </li>
                );
              })}
              <p>End of results</p>
            </ul>
          </div>
          {/* <div className="flex justify-center py-1 ">
          <nav aria-label="Page navigation example">
            <ul className="flex list-style-none">
              {previousUrl && (
                <li className="page-item">
                  <button
                    onClick={() => paginationHandler(previousUrl)}
                    className="flex page-link relative bock py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700  focus:shadow-none"
                  >
                    {" "}
                    <FaAngleDoubleLeft className="mt-1"></FaAngleDoubleLeft>
                    Previous
                  </button>
                </li>
              )}

              {nextUrl && (
                <li className="page-item">
                  <button
                    onClick={() => paginationHandler(nextUrl)}
                    className="flex page-link relative blck py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700 focus:shadow-none"
                  >
                    {" "}
                    Next{" "}
                    <FaAngleDoubleRight className="mt-1"></FaAngleDoubleRight>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default SearchUsers;
