import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./Header";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = "http://127.0.0.1:8000/accounts/userprofile/";

function EditProfile() {
  let { user, authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorData, setErrorData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState({
    f_name: "",
    l_name: "",
    username: "",
    full_name: "",
    email: "",
    phone: "",
    place: "",
    state: "",
    country: "",
    profile_pic: "",
    about: "",
  });
  

  let id = user.user_id;

  useEffect(() => {
    Axios.get(baseUrl+id, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        "Content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log("lll", res.data);
        setUserData({
          f_name: res.data.Data.f_name,
          l_name: res.data.Data.l_name,
          username: res.data.Data.username,
          full_name: res.data.Data.full_name,
          email: res.data.Data.email,
          phone: res.data.Data.phone,
          place: res.data.Data.place,
          state: res.data.Data.state,
          country: res.data.Data.country,
          profile_pic: res.data.Data.profile_pic,
          about: res.data.Data.about,
        });
        console.log("image", userData.profile_pic);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const handleProfileChange = (e) => {
    setUserData({
      ...userData,
      profile_pic: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    console.log("data", e.target.name, "---", e.target.value);
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (data, e) => {
    const userFormData = new FormData();
    userFormData.append("f_name", userData.f_name);
    userFormData.append("l_name", userData.l_name);
    userFormData.append("username", userData.username);
    userFormData.append("email", userData.email);
    userFormData.append("phone", userData.phone);
    userFormData.append("place", userData.place);
    userFormData.append("country", userData.country);
    userFormData.append("state", userData.state);
    userFormData.append("about", userData.about);
    userFormData.append("profile_pic", userData.profile_pic);
    try {
      console.log("form data", userData);
      Axios.put(baseUrl + id , userFormData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("success", res);
          navigate("/user/profile");
        })
        .catch((err) => {
          console.log("err is ", err);
          const {
            response: {
              data: { Errors },
            },
          } = err;
          console.log("errorssss", Errors);
          setErrorData(Errors);
          Swal.fire("Error", err.response.data.Response);
        });
    } catch (error) {
      console.log("error is ", error);
    }
  };

  return (
    <div className="bg-slate-200">
      <Header></Header>
      <div className="sm:px-16 h-full ">
        <div className="mx-3 sm:px-6">
          <div className="bg-zinc-50  mt-10  p-6 m-auto bg- rounded-md  mb-3 ring-2 ring-indigo-600 ">
            <div className="">
              <h1 className="text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy">
                Edit Profile
              </h1>
            </div>

            <div className="bg-slate-200 rounded-md mt-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" justify-around grid grid-cols-2">
                  <div className="mx-4 my-2 text-left  col-span-2 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      First Name
                    </label>
                    <input
                      //   {...register("f_name", {
                      //     required: "Name is required",
                      //     pattern: {
                      //       value: /^[A-Za-z\s]{3,}$/,
                      //       message:
                      //         "Must be Characters & should not be less than 3",
                      //     },
                      //   })}
                      onChange={handleChange}
                      value={userData.f_name}
                      type="text"
                      name="f_name"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.f_name && (
                      <small className="text-red-500">
                        {errors.f_name.message}
                      </small>
                    )}
                    <small className="text-red-600">{errorData.f_name}</small>
                  </div>

                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Last Name
                    </label>
                    <input
                      //   {...register("l_name", {
                      //     required: "Name is required",
                      //     pattern: {
                      //       value: /^[A-Za-z\s]{3,}$/,
                      //       message:
                      //         "Must be Characters & should not be less than 3",
                      //     },
                      //   })}
                      onChange={handleChange}
                      value={userData.l_name}
                      type="text"
                      name="l_name"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.l_name && (
                      <small className="text-red-500">
                        {errors.l_name.message}
                      </small>
                    )}
                    <small className="text-red-600">{errorData.f_name}</small>
                  </div>
                </div>

                <div className=" justify-around grid grid-cols-2">
                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Username
                    </label>
                    <input
                      //   {...register("username", {
                      //     required: "Name is required",
                      //     pattern: {
                      //       value: /^[A-Za-z\s]{3,}$/,
                      //       message:
                      //         "Must be Characters & should not be less than 3",
                      //     },
                      //   })}
                      onChange={handleChange}
                      value={userData.username}
                      type="text"
                      name="username"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.username && (
                      <small className="text-red-500">
                        {errors.username.message}
                      </small>
                    )}
                    <small className="text-red-600">{errorData.username}</small>
                  </div>
                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Email
                    </label>
                    <input
                      //   {...register("email", {
                      //     required: "Email required",
                      //     pattern: {
                      //       value: /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/,
                      //       message: "Invalid email",
                      //     },
                      //   })}
                      onChange={handleChange}
                      value={userData.email}
                      type="email"
                      name="email"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.email && (
                      <small className="text-red-500">
                        {errors.email.message}
                      </small>
                    )}
                    <small className="text-red-600">{errorData.email}</small>
                  </div>
                </div>

                <div className=" justify-around grid grid-cols-2">
                  <div className="mx-4 text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Phone
                    </label>
                    <input
                      //   {...register("phone", {
                      //     required: "Number required",
                      //     pattern: {
                      //       value: /^\d{10}$/,
                      //       message: "Invalid number",
                      //     },
                      //   })}
                      onChange={handleChange}
                      value={userData.phone}
                      type="number"
                      name="phone"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.phone && (
                      <small className="text-red-500">
                        {errors.phone.message}
                      </small>
                    )}
                    <small className="text-red-600">{errorData.phone}</small>
                  </div>
                  <div className="mx-4 items-center text-left my-2 col-span-2 md:col-span-1 px-[45px] md:px-0 ">
                     <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Profile Picture
                    </label>
                    <input
                   
                      onChange={handleProfileChange}
                      type="file"
                      name="profile_pic"
                    
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.profile_pic && (
                      <small className="text-red-500">
                        {errors.profile_pic.message}
                      </small>
                    )}
                    {userData.profile_pic && 
                     <img src={userData.profile_pic} />
                    } 
                    {/* <div class="shrink-0">
                      <img
                        class="h-16 w-16 object-cover rounded-full"
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                        alt="Current profile photo"
                      />
                    </div>
                    <label class="block text-sm font-semibold text-gray-800">
                      <span class="sr-only">Choose profile photo</span>
                      <input
                        type="file"
                        name="profile_pic"
                        class="block w-full text-m text-ind\\igo-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        // file:bg-violet-50 
                        // hover:file:bg-violet-100
                        px-4 py-2 mt-2file: text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40
                        "
                      />
                    </label>
                    <small className="text-red-600">
                      {errorData.profile_pic}
                    </small> */}
                  </div>
                </div>

                <div className=" justify-around grid grid-cols-3">
                  <div className="mx-4 text-left my-2 col-span-3 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      City
                    </label>
                    <input
                      //   {...register("place", { required: "Field required" })}
                      onChange={handleChange}
                      value={userData.place}
                      type="text"
                      name="place"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.place && (
                      <small className="text-red-500">
                        {errors.place.message}
                      </small>
                    )}
                  </div>
                  <div className="mx-4 text-left my-2  col-span-3 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      State
                    </label>
                    <input
                      //   {...register("state", { required: "Field required" })}
                      onChange={handleChange}
                      value={userData.state}
                      type="text"
                      name="state"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.state && (
                      <small className="text-red-500">
                        {errors.state.message}
                      </small>
                    )}
                  </div>

                  <div className="mx-4 text-left my-2  col-span-3 md:col-span-1 px-[45px] md:px-0 ">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800 "
                    >
                      Country
                    </label>
                    <input
                      //   {...register("country", { required: "Field required" })}
                      onChange={handleChange}
                      value={userData.country}
                      type="text"
                      name="country"
                      className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.country && (
                      <small className="text-red-500">
                        {errors.country.message}
                      </small>
                    )}
                  </div>
                </div>

                <div>
                  <div className=" justify-around grid grid-cols-1">
                    <div className="mx-4 text-left my-2  md:col-span-1 px-[45px] md:px-0 ">
                      <label
                        for="email"
                        className="block text-sm font-semibold text-gray-800 "
                      >
                        About
                      </label>
                      <textarea
                        // {...register("about", {
                        //   required: "Field required",
                        // })}
                        onChange={handleChange}
                        value={userData.about}
                        name="about"
                        className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      ></textarea>
                      {errors.about && (
                        <small className="text-red-500">
                          {errors.about.message}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <div className="  ">
                      <button className="m-3  px-8 py-3 text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
