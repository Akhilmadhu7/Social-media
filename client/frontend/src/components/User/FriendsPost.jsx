import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import AuthContext from "../../context/UserAuthContext";

const baseUrl = "http://127.0.0.1:8000/";

function FriendsPost({singlePost}) {
  let { user, authTokens } = useContext(AuthContext);
  let { userdata } = useParams();

  const [postData, setPostData] = useState([]);

  useEffect(() => {
console.log('usedta',userdata);
    try {
      Axios.get(baseUrl + "accounts/userpost/" + userdata, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log("postsss", res.data.Data);
        setPostData(res.data.Data);
      });
    } catch (error) {}
  }, []);




  return (
    <div className="pb-8">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-4 py-8 bg-white">
        <div className="text-center pb-12">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
            Posts
          </h1>
          <hr />
        </div>
        {postData !== [] ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {postData.map((post) => {
              return (
                <div className="w-full bg-white rounded-lg sahdow-lg overflow-hidden hover:cursor-pointer flex flex-col md:flex-row"
                   onClick={()=>singlePost(post.id)}>
                  <div className="w-full h-full md:h-64">
                    <img
                      className="object-center object-cover w-full h-full "
                      src={post.post_image}
                      alt="photo"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No post yet</p>
        )}
      </section>
    </div>
  );
}

export default FriendsPost;
