import Axios  from "axios";
import React, {useState, useEffect} from "react";
import Header from "./Header";
import Swal from "sweetalert2";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useContext } from "react";
import AuthAdminContext from "../../context/AdminAuthContext";

const baseUrl = 'http://127.0.0.1:8000/'

function UserList() {
    const {authTokens} = useContext(AuthAdminContext)
    const [userData, setUserData] = useState([])
    const [nextUrl, setNextUrl] = useState([])
    const [previousUrl, setPreviousUrl] = useState([])
    const [currentUrl, setCurrentUrl] = useState([])

    useEffect(()=>{
        userList(baseUrl+'myadmin/userpage')
    },[])


    function userList(url){
        setCurrentUrl(url)
        Axios.get(url,{headers:{
          'Authorization':`Bearer ${authTokens.access}`,
          'content-type':'application/json'
        }}).then((res)=>{
            console.log('tttt',res.data.results);
            setUserData(res.data.results)
            setNextUrl(res.data.next)
            setPreviousUrl(res.data.previous)
            console.log('aaaa',userData[2])
           
        }).catch(error=>{
            console.log('error is ',error);
        })

    }

    const handleBlockUser = (id,url)=>{
        // setCurrentUrl(url)
        console.log('current',currentUrl);
        Swal.fire({
            title: "Confirm!",
            text: "Do you want to block ?",
            icon: "info",
            confirmButtonText: "Continue",
            showCancelButton: true,
        }).then(res =>{
            if (res.isConfirmed) {

                Axios.post(baseUrl+'myadmin/blockuser/'+id).then(res =>{
                    if (res) {
                        console.log(res);
                        userList(url)
                    }
                })  
            }
        })
    }

    const paginationHandler = (url)=>{
        console.log('next',nextUrl);
        userList(url)
    }


  return (
    <div>
        <Header></Header>
      <div className="bg-slate-200 rounded-md h-full ring-2 ring-indigo-600 ">
        <div className="">
          <div className=" p-3 m-autorounded-md  mb-3 ">
            <div className="">
              <h1 className="text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy">
                Users List
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md">
          <div>
            <div className="bg-gray-100  rounded-md">
              <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-">
                      <table class="min-w-full">
                        <thead class="bg-white border-b">
                          <tr>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                            >
                              Sl.No
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                            >
                              First Name
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                            >
                              Last Name
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                            >
                             Full Name
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                            >
                              Username
                            </th>
                            
                            <th
                              scope="col"
                              class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        
                        <tbody>
                          {userData.map((users, index) => {
                            return ( 
                              <tr class="bg-gray-100 border-b text-align-center ">
                                <td key={users.id} class="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {index + 1}
                                </td>
                                <td class="text-sm text-gray-900 font-light  px-6 py-1  whitespace-nowrap">
                                  {users.f_name}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                                  {users.l_name}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                                  {users.f_name}  {users.l_name}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                                  {users.email}
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                  {users.username}
                                </td>
                                
                                <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                                    {users.is_active ?(
                                     <button 
                                     onClick={()=>handleBlockUser(users.id,currentUrl)}
                                   
                                         className='m-3 px-8 py-3 text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'>
                                             Block
                                    </button> )
                                    :(
                                    <button 
                                    onClick={()=>handleBlockUser(users.id,currentUrl)}
                                  
                                        className='m-3 px-6 py-3 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
                                            Unblock
                                   </button> )
                                    }
                                </td>
                              </tr>
                             );
                          })} 
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="flex justify-center py-1 ">
          <nav aria-label="Page navigation example">
            <ul className="flex list-style-none">
              {previousUrl && (
                <li className="page-item">
                  <button
                    onClick={() => paginationHandler(previousUrl)}
                    className="flex page-link relative bock py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700  focus:shadow-none"
                  >
                    {" "}
                    <FaAngleDoubleLeft className="m-1"></FaAngleDoubleLeft>
                    Previous
                  </button>
                </li>
              )}

              {nextUrl && (
                <li className="page-item">
                  <button
                    onClick={() => paginationHandler(nextUrl)}
                    className="flex page-link relative blck py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700 focus:shadow-none"
                  >
                    {" "}
                    Next{" "}
                    <FaAngleDoubleRight className="m-1"></FaAngleDoubleRight>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
        
      </div>
      
    </div>
  );
}

export default UserList;
