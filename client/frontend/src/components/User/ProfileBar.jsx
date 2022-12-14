import React from "react";
import { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/";

function ProfileBar() {
  let { user, authTokens } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);

  const id = user.user_id;

  useEffect(() => {
    Axios.get(baseUrl + "accounts/userprofile/" + id, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        "content-type": "applicaion/json",
      },
    })
      .then((res) => {
        setUserData(res.data.Data);
        console.log("logged", user.is_logged);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div>
      <div class="flex justify-center ">
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2 border-b border-gray-200 ">
            My Profile
          </h5>
          <div className="ml4">
            {userData.profile_pic ? (
              <img
                // src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                src={userData.profile_pic}
                className="rounded-full w-1/2 content-center my-3 ml-14 "
                alt=""
              />
            ) : (
              <svg
                // className="w-12 h-12 text-gray-400  rounded-full m-2"
                className="rounded-full w-1/2 text-gray-400  content-center my-3 ml-14 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            )}
          </div>
          {user && <h3 className="font-semibold">{user.username}</h3>}
          <h6>{userData && userData.full_name}</h6>
          <p class="text-gray-700 text-base mb-4">
            {userData.about !== "null" ? userData.about : ""}
          </p>
          <Link to="/user/profile">
            <button
              type="button"
              class=" inline-block px-6 py-2.5 bg-indigo-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-800 hover:shadow-lg focus:bg-indigo-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-900 active:shadow-lg transition duration-150 ease-in-out"
            >
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;
