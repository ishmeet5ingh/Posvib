import React, {useEffect, useState} from 'react'
import { PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import '../index.css'
import {useSelector} from 'react-redux'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const posts = useSelector((state) => state.config.posts);



    useEffect(() => {
        if (slug) {
          posts && posts.map((post, index) =>{
            if(slug===post?.$id){
              setPost(post)
            }
          })
        } else navigate("/");
      }, [slug, navigate]);
  return post ? (
    <div className=" h-screen overflow-y-scroll hide-scrollbar flex flex-col min-h-screen border-r border-teal-800 w-full sm:w-96 md:w-[500px] ">
      <div className=" mt-16 mb-28 border-y border-teal-800">
        <PostForm post={post}/>

      </div>
    </div>
  ) : null
}

export default EditPost