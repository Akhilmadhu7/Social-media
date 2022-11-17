import React from 'react'
import FriendProfile from '../../components/User/FriendProfile'
import FriendsPost from '../../components/User/FriendsPost'
import Header from '../../components/User/Header'
import Post from '../../components/User/Post'

function FriendProfilePage() {
  return (
    <div>
      <div className=" bg-slate-100">
        <Header></Header>
        <FriendProfile></FriendProfile>
        <FriendsPost></FriendsPost>
      </div>
    </div>
  )
}

export default FriendProfilePage