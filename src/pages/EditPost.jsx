import React, {useEffect, useState} from 'react'
import { PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import '../index.css'
import {useSelector} from 'react-redux'

function EditPost() {
    const [post, setPost] = useState(null)
    const [idx, setIdx] = useState(0);
    const {slug} = useParams()
    const navigate = useNavigate()
    const posts = useSelector((state) => state.config.posts);



    useEffect(() => {
        if (slug) {
          posts && posts.map((post, index) =>{
            if(slug===post?.$id){
              setPost(post)
              setIdx(index)
            }
          })
        } else navigate("/");
      }, [slug, navigate]);
  return post ? (
    <div className='h-screen overflow-y-scroll hide-scrollbar border-r border-teal-800 py-16'>
    <div className='border-b border-teal-800'>
        <PostForm post={post} idx={idx}/>
    </div>
    </div>
  ) : null
}

export default EditPost