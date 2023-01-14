import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/User/Header";
import Post from "../../components/User/Post";
import UserProfile from "../../components/User/UserProfile";
import Axios from "axios";
import AuthContext from "../../context/UserAuthContext";
import SinglePost from "../../components/User/SinglePost";

const baseUrl = "http://127.0.0.1:8000/accounts/";

function UserProfilePage() {
  let { user, authTokens } = useContext(AuthContext);
  const [singleData, setSingleData] = useState([]); //state to store single post data.
  const [like, setLike] = useState(); 
  const [commentData, setCommentData] = useState([]); //state to store single post commnets.
  const [singleModal, setSingleModal] = useState(false); //state to set single post modal.

  //function to show single post details.
  const singlePost = (id) => {
    console.log("properties", id);
    try {
      Axios.get(baseUrl + "singlepost/" + id, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      }).then((res) => {
        console.log("single post", res.data);
        setSingleData(res.data.Data);

        console.log("commentshere", res.data.Comment);
        setCommentData(res.data.Comment);
        setLike(res.data.Like);
        setSingleModal(true);
      });
    } catch (error) {}
  };

  const [postData, setPostData] = useState([]);
  let data = { username: user.username };
  
  useEffect(() => {
    console.log("daaaaaaa", data);
    console.log("typee", typeof data);
    allPost();
    // try {
    //   Axios.get(baseUrl+'userpost/'+user.username,{
    //     headers:{
    //       Authorization:`Bearer ${authTokens.access}`,
    //       "Content-type": "application/json",
    //     }
    //   }).then((res)=>{
    //      console.log('postsss',res.data.Data);
    //      setPostData(res.data.Data)
    //   })
    // } catch (error) {

    // }
  }, []);

  const allPost = () => {
    console.log("daaaaaaa", data);
    console.log("typee", typeof data);
    try {
      Axios.get(baseUrl + "userpost/" + user.username, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-type": "application/json",
        },
      }).then((res) => {
        console.log("postsss", res.data.Data);
        setPostData(res.data.Data);
      });
    } catch (error) {}
  };

  return (
    <div>
      <div className=" bg-slate-100">
        <Header></Header>
        <div className="mt-5">
          {singleModal && (
            <SinglePost
              like={like}
              setSingleModal={setSingleModal}
              allPost={allPost}
              singlePost={singlePost}
              singleData={singleData}
              commentData={commentData}
            />
          )}
        </div>
        <UserProfile></UserProfile>
        <Post singlePost={singlePost} postData={postData}></Post>
      </div>
    </div>
  );
}

export default UserProfilePage;
