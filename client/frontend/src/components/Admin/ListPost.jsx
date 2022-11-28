import Axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Swal from "sweetalert2";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useContext } from "react";
import { format } from 'timeago.js';
import moment from 'moment';
import AuthAdminContext from "../../context/AdminAuthContext";

const baseUrl = "http://127.0.0.1:8000/";

function ListPost() {
  let { admin, authTokens } = useContext(AuthAdminContext);
  const [postData, setPostData] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [previousUrl, setPreviousUrl] = useState();

  useEffect(() => {
    postList(baseUrl + "myadmin/listpost");
  }, []);

  const postList = (url) => {
    try {
      Axios.get(url, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
        .then((res) => {
          console.log("llistres", res.data);
          setPostData(res.data.results);
          setNextUrl(res.data.next);
          setPreviousUrl(res.data.previous);
        })
        .catch((err) => {
          console.log("errrr", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div className="bg-slate-200 rounded-md h-full ring-2 ring-indigo-600  ">
        <div className="">
          <div className="   p-3 m-autorounded-md  mb-3 ">
            <div className="">
              <h1 className="text-indigo-700  text-center text-3xl font-semibold underline uppercase decoration-wavy">
                Posts
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-slate-200 rounded-md">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
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
                          User
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                        >
                          Upload Date
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                        >
                          View Post
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                        >
                          No:of reports
                        </th>
                        {/* class="text-sm font-medium text-gray-900 px-6 py-4 text-center" */}
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {postData.map((post, index) => {
                        return (
                          <tr class="bg-gray-100 border-b">
                            <td class="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td class="text-sm text-gray-900 font-light  px-6 py-1  whitespace-nowrap">
                              {post.user.username}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                              {/* {format(post.created_at)} */}
                            {moment((post.created_at)).format("MMM Do YY") } 
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                            <button
                                // onClick={()=>handleBlockUser(users.id,currentUrl)}

                                className="m-3 px-6 py-3 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                              >
                                View
                              </button>
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {post.likes_no}
                            </td>
                            <td class="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                              <button
                                // onClick={()=>handleBlockUser(users.id,currentUrl)}

                                className="m-3 px-6 py-3 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                              >
                                Unblock
                              </button>
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
        <div className="flex justify-center py-1">
          <nav aria-label="Page navigation example">
            <ul className="flex list-style-none">
              {/* {previousUrl && ( */}
              <li className="page-item">
                <button
                  // onClick={() => paginationHandler(previousUrl)}
                  className="flex page-link relative bock py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700  focus:shadow-none"
                >
                  {" "}
                  <FaAngleDoubleLeft className="m-1"></FaAngleDoubleLeft>
                  Previous
                </button>
              </li>
              {/* )} */}

              {/* {nextUrl && ( */}
              <li className="page-item">
                <button
                  // onClick={() => paginationHandler(nextUrl)}
                  className="flex page-link relative blok py-1.5 px-3 md-rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-indigo-700 hover:text-white hover:bg-indigo-700 focus:shadow-none"
                >
                  {" "}
                  Next <FaAngleDoubleRight className="m-1"></FaAngleDoubleRight>
                </button>
              </li>
              {/* )} */}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ListPost;
