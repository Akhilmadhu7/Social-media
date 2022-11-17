import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/";

function FriendProfile() {
  let { authTokens } = useContext(AuthContext);
  const [friendprofile, setFreindProfile] = useState([]);
  const { user_id } = useParams();

  console.log("iddd", user_id);

  useEffect(() => {
    try {
      Axios.get(baseUrl + "accounts/userprofile/" + user_id, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          console.log("rsultrtt", res);
          setFreindProfile(res.data.Data);
        })
        .catch((err) => {
          console.log("errrr", err);
        });
    } catch (error) {}
  }, [user_id]);

  return (
    <div>
      <div className="relative max-w-md mx-auto md:max-w-2xl pt-10 mt6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  //   src={userData.profile_pic}
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  //   alt={userData.username}
                />
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
                    3,360
                  </span>
                  <span className="text-sm text-slate-400">Photos</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    2,454
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>

                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    564
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
                    href="javascript:;"
                    className="font-normal text-white py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700"
                  >
                    Follow
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
