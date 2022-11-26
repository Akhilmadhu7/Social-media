import React, {useContext, useState} from "react";
import Header from "../../components/User/Header";
import Post from "../../components/User/Post";
import UserProfile from "../../components/User/UserProfile";
import Axios  from 'axios'
import AuthContext from "../../context/UserAuthContext";
import SinglePost from '../../components/User/SinglePost'


const baseUrl = "http://127.0.0.1:8000/accounts/";




function UserProfilePage() {

    let {user, authTokens} = useContext(AuthContext)
    const [singleData, setSingleData] = useState([])
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
                console.log('single post',res.data);
                setSingleData(res.data.Data)
                setLike(res.data.Like)
                setSingleModal(true)

            })
        } catch (error) {
            
        }
        }

  return (
    <div>
      <div className=" bg-slate-100">
        <Header></Header>
        <div className='mt-5'>
            {singleModal && <SinglePost like={like} setSingleModal={setSingleModal} singlePost={singlePost} singleData={singleData}/>}
        </div>
        <UserProfile></UserProfile>
        <Post singlePost={singlePost}></Post>
      </div>
    </div>
  );
}

export default UserProfilePage;
