import React from "react";
import Header from "../../components/User/Header";
import Post from "../../components/User/Post";
import UserProfile from "../../components/User/UserProfile";


function UserProfilePage() {
  return (
    <div>
      <div className=" bg-slate-100">
        <Header></Header>
        <UserProfile></UserProfile>
        <Post></Post>
      </div>
    </div>
  );
}

export default UserProfilePage;
