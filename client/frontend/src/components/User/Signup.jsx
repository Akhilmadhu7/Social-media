import React, { useState , useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Axios from 'axios'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import AuthContext from '../../context/UserAuthContext';


const baseUrl = 'http://127.0.0.1:8000/'

function Signup() {
  const navigate = useNavigate()
  let {username} = useContext(AuthContext)

  const [errorData, setErrorData] = useState([])

  const {
    register,
    handleSubmit,
    getValues,
    formState:{errors}
  } = useForm();

  const [userData,setUserData] = useState({
    f_name:'',
    l_name:'',
    username:'',
    phone:'',
    email:'',
    password:'',
    password2:''
  });

  const handleChange= (e) =>{
    console.log('data',e.target.name,'---',e.target.value);
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (data, e) =>{
    e.preventDefault();

    try {
      Axios.post(baseUrl+'accounts/register',{
        f_name: userData.f_name,
        l_name: userData.l_name,
        username: userData.username,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
        password2: userData.password2
      }).then((res) =>{
        navigate('/')
        
      }).catch((error)=>{
        console.log(error.response)
        const{data:{Response}} = error.response
        setErrorData(Response)
      })
      
    } catch ( error) {
      console.log('errors',error);
    }
  }

  return (
    
    <div>
      <div className="relative  flex-col justify-center min-h-screen overflow-hidden grid  sm:grid-cols-1">
        <div className="p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
            Sign UP
          </h1>
          <form className="mt-6 text-left " onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="  justify-around grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800 "
                  >
                    Firstname
                  </label>

                  <input
                  {...register("f_name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]{3,}$/,
                      message:
                        "Must be Characters & should not be less than 3",
                    },
                  })}
                    type="text"
                    name="f_name"
                    // value={}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.f_name && (
                      <small className="text-red-500">
                        {errors.f_name.message}
                      </small>
                    )}
                    <small className="text-red-600">{errorData.f_name}</small>
                </div>

                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Lastname
                  </label>
                  <input
                  {...register("l_name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[A-Za-z\s]{3,}$/,
                      message:
                        "Must be Characters & should not be less than 3",
                    },
                  })}
                    type="text"
                    onChange={handleChange}
                    name="l_name"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.l_name && (
                      <small className="text-red-500">
                        {errors.l_name.message}
                      </small>
                    )}
                    
                </div>
              </div>
              <div className="mb-2  justify-around grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Username
                  </label>
                  <input
                    {...register("username",{
                      required: "Username required"
                    })}
                    type="text"
                    onChange={handleChange}
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

                <div className="mb-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Phone
                  </label>
                  <input
                    {...register("phone", {
                      required: "Number required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Invalid number",
                      },
                    })}
                    type=""
                    onChange={handleChange}
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
              </div>
              <div className="mb-2  justify-around grid sm:grid-cols-1 md:grid-cols-2'">
              <div>
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email required",
                      pattern: {
                        value: /^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{2,3}$/,
                        message: "Invalid email",
                      },
                    })}
                    // type="email"
                    onChange={handleChange}
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
                <div>
                  <label
                    for="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Password
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
                    type="password"
                    onChange={handleChange}
                    name="password"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password && (
                      <small className="text-red-500">
                        {errors.password.message}
                      </small>
                    )}
                </div>

                <div>
                  <label
                    for="password"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Confirm Password
                  </label>
                  <input
                    {...register("password2", {
                      required: "Password required",
                      pattern: {
                        value: /^[a-zA-Z0-9]{8}[0-9]*[A-Za-z]*$/,
                        message: "Password should be strong"
                      },
                      minLength: {
                        value: 8,
                        message: "Password should not be less than 8 characters"
                      },
                      validate:(value) => {
                        const {password} = getValues();
                        return password === value || 'Password should match'
                      }
                    })}
                    type="password"
                    onChange={handleChange}
                    name="password2"
                    className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password2 && (
                      <small className="text-red-500">
                        {errors.password2.message}
                      </small>
                    )}
                </div>
              </div>
              <div className="mt-6">
                <button
                //   onClick={submitForm}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Signup
                </button>
              </div>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Signup