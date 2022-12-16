import React,{useContext,useState} from "react";
import {FaCircle} from 'react-icons/fa'
import AuthContext from "../../context/UserAuthContext";

function ActiveFriends() {

  

  return (
    <div className="">
      <div class="flex justify-center ">
        <ul class="bg-white rounded-lg border border-gray-200  text-gray-900">
          <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-indigo-700 text-white">
            Active Friends
          </li>
          <li class="px-6 py-2 flex border-b border-gray-200 w-fit">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-1/6 h-1/6"
              alt=""
            />
            <strong className="ml-3">Jasim</strong> {" "} 
            <small className="text-green-600 ml-12 mt-3 flex justify-end w-full">
              <FaCircle/>
            </small>
          </li>
          <li class="px-6 py-2 flex border-b border-gray-200 w-fit">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-1/6 h-1/6"
              alt=""
            />
            <strong className="ml-3">sangeeth</strong> {" "} 
            <small className="text-green-600 ml-6 mt-3 flex justify-end w-full">
            <FaCircle/>
            </small>
          </li>
          <li class="px-6 py-2 flex border-b border-gray-200 w-fit">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-1/6 h-1/6"
              alt=""
            />
            <strong className="ml-3">ashik</strong> {" "} 
            <small className="text-green-600 ml-12 mt-3 flex justify-end w-full">
            <FaCircle/>
            </small>
          </li>
          <li class="px-6 py-2 flex border-b border-gray-200 w-fit">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-1/6 h-1/6"
              alt=""
            />
            <strong className="ml-3">faisal</strong> {" "} 
            <small className="text-green-600 ml-12 mt-3 flex justify-end w-full">
            <FaCircle/>
            </small>
          </li>
          <li class="px-6 py-2 flex border-b border-gray-200 w-fit">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-1/6 h-1/6"
              alt=""
            />
            <strong className="ml-3 ">praveen</strong> {" "} 
            <small className="text-green-600 mt-3 flex justify-end w-full">
            <FaCircle/>
            </small>
          </li>
          {/* <li class="px-6 py-2 w-full rounded-b-lg">And a fifth one</li> */}
        </ul>
        
      </div>
    </div>
  );
}

export default ActiveFriends;
