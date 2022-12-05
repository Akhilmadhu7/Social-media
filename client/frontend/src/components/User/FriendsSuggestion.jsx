import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/accounts/";

function FriendsSuggestion() {
  let { authTokens, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newFriends, setNewFriends] = useState([]); //state to store suggestion frined list.
  const [follow, setFollow] = useState([]); //state to show 'follow' if user follow the suggest listed friend.
  const [followUsername, setFollowUsername] = useState([
    {
      //state to check the followed user profile and suggestion friend are same to show the 'follow'
      username: "",
    },
  ]);

  useEffect(() => {
    newfriends(baseUrl + "new-friends");
  }, []);

  //function to call the suggestion friends list api.
  function newfriends(url) {
    try {
      Axios.get(url, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          console.log("result", res.data);
          setNewFriends(res.data.Response);
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {}
  }

  //funciton to go to the friend profile component.
  const findProfile = (username) => {
    console.log("here is the id", username);
    navigate("/user/friend-profile/" + username);
  };

  //fucntion to follow the suggestion list friends.
  const followUser = (username) => {
    // let data={username : user.username,
    //   follower : id}
    try {
      // console.log('daataaaa',data);
      Axios.post(
        baseUrl + "follow",
        { follower: user.user_id, username: username },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            // 'content-type':'application/json'
          },
        }
      )
        .then((res) => {
          console.log("nrew rsponse", res.data);
          setFollow(res.data);
          if (res.data.Data) {
            setFollowUsername(res.data.Data);
          } else {
            setFollowUsername("");
          }
        })
        .catch((err) => {
          console.log("errer fol", err);
        });
    } catch (error) {
      console.log("foll err", error.data);
    }
  };
  newFriends.map((f) => {
    if (f.username === "sangeeth" in follow) {
      console.log("following");
    } else {
      console.log("follow");
    }
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      {newFriends.map((friends) => {
        return (
          <div className="main bg-white grid place-items-center ">
            <div className="card bg-white flex flex-col items-center justify-center p-2 sm:p-4 shadow-lg rounded-2xl w-[9rem]  sm:w-64">
              <div className="profile mx-auto rounded-full py-2 w-8 sm:w-16">
                {friends.profile_pic ? (
                  <img
                    src={friends.profile_pic}
                    className="rounded-full"
                    alt="profile"
                  />
                ) : (
                  <svg
                    // className="w-12 h-12 text-gray-400 rounded-full m-2"
                    className="mx-auto text-gray-400 rounded-full py-2 w-8 sm:w-16"
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

              <div
                className="name text-gray-800 text:sm sm:text-2xl font-medium mt-4 hover:cursor-pointer"
                onClick={() => findProfile(friends.username)}
              >
                <p>{friends.username}</p>
              </div>

              <div className="username text-gray-500">
                <p>{friends.full_name}</p>
              </div>

              <div className="work text-gray-700 sm:mt-2 mt-4">
                <p>Front-end developer 🧑‍💻</p>
              </div>

              <div className="w-full mt-4 sm:mt-8">
                <button
                  // onClick={() => followUser(friends.username)}
                  onClick={() => findProfile(friends.username)}
                  className="bg-blue-500 py-2 px-2 sm:px-4 hover:bg-blue-600 text-white w-full cfont-semibold rounded-lg shadow-lg"
                >
                  view
                  {/* {follow.followinguser ? follow.followinguser : "follow"} */}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FriendsSuggestion;
