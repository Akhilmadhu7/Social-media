import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'
import Axios from "axios";
import Header from "./Header";
import AuthContext from "../../context/UserAuthContext";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/";

function UserProfile() {
  let { authTokens,user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [userFollowers, setUserFollowers] = useState([])
  const [modal, setModal] = useState(false);
  const [changePassword, setChangePassword] = useState({
    'password':'',
    'new_password':''
  })
  const [passwordError,setPasswordError]=useState([])

  const {
    register,
    handleSubmit,
    getValues,
    formState:{errors}
  } = useForm();

  let id = user.user_id
  // let data={username : user.username,
  //   follower : user_id}

  useEffect(() => {
    Axios.get(baseUrl + "accounts/userprofile/"+id, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        "content-type": "applicaion/json",
      },
    })
      .then((res) => {
        setUserData(res.data.Data);
        setUserFollowers(res.data.userfollowers)
        console.log('daaa',res.data);
       
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const handleChangePassword = (e)=>{
    console.log(e.target.value);
    setChangePassword({
      ...changePassword,
      [e.target.name]:e.target.value
    })
  }


  const handleModal = () => {
    setModal(!modal);
    if (passwordError) {
      setPasswordError([])
    }
  };
  
  const changePasswordSubmit = (e)=>{
    e.preventDefault()
    console.log('here it is ');
    try {
      Axios.put(baseUrl+'accounts/change-password',changePassword,{
        headers:{
          'Authorization':`Bearer ${authTokens.access}`,
          'Content-Type':'application/json'
        }
      }).then((res)=>{
        Swal.fire("Success","Password changed successfully")
        setModal(!modal)
      }).catch(err=>{
        console.log('pas err',err);
        const{response:{data}}=err
        setPasswordError(data)
      })
    } catch (error) {
      console.log(error);
    }
  }

 

  return (
    <div>
      

      <div className="relative max-w-md mx-auto md:max-w-2xl pt-10 mt6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  // src={userData.profile_pic}
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  alt={userData.username}
                />
              </div>
            </div>

            <div className="text-center mt-24">
              <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                {user && user.username}
              </h3>
              {userData.full_name}
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                {userData && userData.state}, {userData && userData.country}{" "}
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
              {userData.about !== "null" ? 
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  
                  {userData.about }
                </p>
                : ""}
                <Link to="/user/editprofile">
                  <button
                    href="javascript:;"
                    className="font-normal text-white p-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
              <button
                className="my-4 text-indigo-700 hover:text-red-600"
                onClick={handleModal}
              >
                Change password
              </button>
            </div>
          </div>
        </div>
        {modal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Change Password</h3>
                  </div>
                  {/*body*/}
                  <div className="reltive px-10 flex-auto">
                    

                    {/* <div className="w-full max-w-xs"> */}
                      <form 
                       onSubmit={changePasswordSubmit}
                       className="bg-white shado rounded px-8 pt-6 pb- mb-4">
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="password"
                          >
                            Current Password
                          </label>
                          <input
                            className="shadow appearance-none border  border-violet-700 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            onChange={handleChangePassword}
                            name="password"
                            type="password"
                            placeholder="current password"
                          />
                          <div>

                          <small className="text-red-600">{passwordError.password}</small>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="password"
                          >
                            New Password
                          </label>
                          <input
                          {...register("password", {
                            required: "Password required",
                            pattern: {
                              value: /^[a-zA-Z0-9]{8}[0-9]*[A-Za-z]*$/,
                              message: "Password should be strong"
                            },
                            minLength: {
                              value: 8,
                              message: "Password should not be less than 8 characters"
                            }
                          })}
                            className="shadow appearance-none border border-violet-700 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            onChange={handleChangePassword}
                            name="new_password"
                            type="password"
                            placeholder="new password"
                          />
                          <div>
                          {errors.password && (
                            <small className="text-red-500">
                              {errors.password.message}
                            </small>
                          )}
                          <small className="text-red-600">{passwordError.new_password}</small>

                          </div>
                        </div>
                        <div className="flx items-ceter justiy-between">
                          <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                          >
                            Change password
                          </button>
                          
                        </div>
                      </form>
                   
                  </div>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    

                    <button
                      onClick={handleModal}
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserProfile;
