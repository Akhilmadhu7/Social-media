import React, {useContext, useState} from 'react'
import FriendProfile from '../../components/User/FriendProfile'
import FriendsPost from '../../components/User/FriendsPost'
import Header from '../../components/User/Header'
import Post from '../../components/User/Post'
import Axios  from 'axios'
import AuthContext from "../../context/UserAuthContext";
import SinglePost from '../../components/User/SinglePost'


const baseUrl = "http://127.0.0.1:8000/accounts/";

function FriendProfilePage() {
    let {user, authTokens} = useContext(AuthContext)
    const [singleData, setSingleData] = useState([])
    const [commentData,setCommentData] = useState([])
    const [like, setLike] = useState()
    const [singleModal, setSingleModal] = useState(false)

    const singlePost = (id)=>{
        console.log('properties',id);
        try {
            Axios.get(baseUrl+'singlepost/'+id,{
                headers:{
                    Authorization:`Bearer ${authTokens.access}`
                }
            }).then((res)=>{
                console.log('single post',res.data.Data);
                setSingleData(res.data.Data)
                console.log('commentshere',res.data.Comment);
                setCommentData(res.data.Comment)
                setLike(res.data.Like)
                setSingleModal(true)

            })
        } catch (error) {
            
        }
        }
    console.log('userser',singleData);    

  return (
    <div>
      <div className=" bg-slate-100">
        <Header></Header>
        <div className='mt-5'>
            {singleModal && <SinglePost like={like} setSingleModal={setSingleModal} singlePost={singlePost} singleData={singleData} commentData={commentData}/>}
        </div>
        <FriendProfile></FriendProfile>
        <FriendsPost singlePost={singlePost}></FriendsPost>
      </div>
    </div>
  )
}

export default FriendProfilePage