import React from "react";
import { useContext } from "react";
import { FaRegPaperPlane, FaRegComment, FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import AuthContext from "../../context/UserAuthContext";

function Home() {
  let { user } = useContext(AuthContext);
  console.log("hoekasdj");
  return (
    <div>
      <div className=" bg-white">
        <div className="flex">
          <div className="">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-8 sm:w-16  m-2 "
              alt="Avatar"
            />
          </div>
          <div className=" sm:mt-2 p-3">
            <h2 className="  md:text-xl">NandaGopal </h2>
          </div>
        </div>

        <div className="flex justify-center mb-5 ">
          <div className="rounded-lg shadow-lg bg-white w-full flex flex-col items-center">
        
              <img className="w-full"
                src="https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                alt=""
              />
         
            <div className="flex bg-gren-400 w-full">
              <button className="my-2 ml-2  sm:m-4 bg-yllow-400" type="submit">
                <FaRegHeart className="sm:h-8 w-8 text-" />
              </button>
              <button className="my-2 ml-2  sm:m-4 bg-idigo-400" type="submit">
                <FaRegComment className="sm:h-8 w-8" />
              </button>
              <button className="my-2 ml-2  sm:m-4 bg-rd-400 " type="submit">
                <FaRegPaperPlane className="sm:h-8 w-8 " />
              </button>
            </div>
            <div className="w-full pl-5"> 
            <p className="text-left text-base sm:text-xl">3000 Likes</p>

            </div>


            <div className="w-full pl-5">
              {/* <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5> */}
              <p class="text-gray-700 text-left text-xs sm:text-base  mb-4">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white mb-3">
        <div className="flex">
          <div className="w-fit">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-full w-8 sm:w-16  m-2 "
              alt="Avatar"
            />
          </div>
          <div className=" sm:mt-2 p-3">
            <h2 className="  md:text-xl">NandaGopal </h2>
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <div className="rounded-lg shadow-lg bg-white ">
            <a href="#!">
              <img
                className="object-covver"
                src="https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                alt=""
              />
            </a>
            <div className="flex flex-row  bg-gren-400">
              <button className="my-2 ml-2  sm:m-4 bg-yllow-400" type="submit">
                <FaRegHeart className="sm:h-8 w-8 text-" />
              </button>
              <button className="my-2 ml-2  sm:m-4 bg-idigo-400" type="submit">
                <FaRegComment className="sm:h-8 w-8" />
              </button>
              <button className="my-2 ml-2  sm:m-4 bg-rd-400 " type="submit">
                <FaRegPaperPlane className="sm:h-8 w-8 " />
              </button>
            </div>

            <p className="text-left text-base sm:text-xl ml-7">3000 Likes</p>

            <div className=" ">
              {/* <h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5> */}
              <p class="text-gray-700 text-left text-base  mb-4 ml-7">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              {/* <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
