import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/";

function FriendProfile() {
  let { authTokens, user } = useContext(AuthContext);
  const [friendprofile, setFreindProfile] = useState([]);
  const [follow, setfollow] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const { userdata } = useParams();
  const [postCount, setPostCount] = useState();
  const [modalFollowers, setModalFollowers] = useState(false); //modal for showing followers.
  const [followersList, setFollowersList] = useState([]); //state to display all the followers.
  const [modalFollowing, setModalFollowing] = useState(false); // modal for showing following users.
  const [followingList, setFollowingList] = useState([]); //state to display all the following users.

  console.log("iddd", userdata); //useredata contains username of the friend passing through params.

  let data = { username: userdata, follower: user.user_id };

  useEffect(() => {
    userProfile(baseUrl + "accounts/friends-profile/" + userdata);
  }, [userdata]);

  // function to call the user profile api.
  function userProfile(url) {
    try {
      Axios.get(url, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          console.log("rsultrtt", res.data);
          setFreindProfile(res.data.Data);
          setUserFollowers(res.data.userfollowers);
          setfollow(res.data.follow);
          setPostCount(res.data.count);
        })
        .catch((err) => {
          console.log("errrr", err);
        });
    } catch (error) {}
  }

  // function to follow and unfollow user.
  const followUser = () => {
    try {
      console.log("daataaaa", data);
      Axios.post(baseUrl + "accounts/follow", data, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          // 'content-type':'application/json'
        },
      })
        .then((res) => {
          if (res) {
            console.log("follow res", res.data);
            userProfile(baseUrl + "accounts/friends-profile/" + userdata);
          }
        })
        .catch((err) => {
          console.log("errer fol", err);
        });
    } catch (error) {
      console.log("foll err", error.data);
    }
  };

  // console.log('here is the total count',postCount.post_count);

  //   // function to call to get the list of followers.
  //   const handleFollowers = () => {
  //     Axios.get(baseUrl + "accounts/followers", {
  //       headers: {
  //         Authorization: `Bearer ${authTokens.access}`,
  //       },
  //     })
  //       .then((res) => {
  //         console.log("folllist", res.data.Data);
  //         setFollowersList(res.data.Data);
  //       })
  //       .catch((error) => {
  //         console.log("errors", error);
  //       });
  //     setModalFollowers(!modalFollowers);
  //   };

  //   // function to call to get the list of following users.
  //   const handleFollowing = () => {
  //     Axios.get(baseUrl + "accounts/following", {
  //       headers: {
  //         Authorization: `Bearer ${authTokens.access}`,
  //       },
  //     })
  //       .then((res) => {
  //         console.log('fjo dadadfas',res.data);
  //         setFollowingList(res.data.Data);
  //       })
  //       .catch((err) => {
  //         console.log("errrr", err);
  //       });
  //     setModalFollowing(!modalFollowing);
  //   };

  return (
    <div>
      <div className="relative max-w-md mx-auto md:max-w-2xl pt-10 mt6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                {friendprofile.profile_pic ? (
                  <img
                    src={friendprofile.profile_pic}
                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                    //   alt={userData.username}
                  />
                ) : (
                  <svg
                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px] text-gray-400 "
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
            </div>

            <div className="text-center mt-24">
              <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                {friendprofile && friendprofile.username}
              </h3>
              {friendprofile.full_name}
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                {friendprofile.state !== "null" ? friendprofile.state : ""}{" "}
                {friendprofile.country !== "null" ? friendprofile.country : ""}
                <br />
              </div>
            </div>

            <div className="w-full text-center mt-4">
              <div className="flex justify-center ">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {postCount && postCount.post_count}
                  </span>
                  <span className="text-sm text-slate-400">Photos</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {userFollowers && userFollowers.followers}
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>

                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    {userFollowers && userFollowers.following}
                  </span>
                  <span className="text-sm text-slate-400">Following</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  {friendprofile.about !== "null" ? friendprofile.about : ""}
                </p>
                <Link>
                  <button
                    onClick={followUser}
                    href="javascript:;"
                    className="font-normal text-white py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700"
                  >
                    {console.log(follow.follow)}
                    {/* {follow.follow ==='following' ? follow.follow : follow.unfollow} */}
                    {follow.followinguser
                      ? follow.followinguser
                      : follow.follow}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendProfile;
