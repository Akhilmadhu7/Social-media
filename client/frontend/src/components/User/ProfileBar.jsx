import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/UserAuthContext";


function ProfileBar() {

    let {user} = useContext(AuthContext)
  return (
    <div>
      <div class="flex justify-center">
        <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2 border-b border-gray-200 ">
            My Profile
          </h5>
          <div className='ml4'>
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-full w-1/2 content-center my-3 ml-14 "
            alt=""
          />
          </div>
          {user && <h3 className="font-semibold">{user.username}</h3> }
          <p class="text-gray-700 text-base mb-4">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button
            type="button"
            class=" inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;
