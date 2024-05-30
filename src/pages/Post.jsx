import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, PostCard } from "../components";
import { useSelector } from "react-redux";
import '../index.css'



export default function Post() {

  const avatarsUrl = appwriteService.getAvatars()
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.config.posts);

  useEffect(() => {
    if (slug) {
      posts && posts.map((post) =>
      slug===post?.$id && setPost(post)
        
      )
    } else navigate("/");
  }, [slug, navigate]);



  return post ? (
    <div className="py-16 h-screen overflow-y-scroll border-r border-teal-800 sm:w-96 md:w-[500px] hide-scrollbar">
<div className="border-b border-teal-800">
    <PostCard {...post} />
</div>
     
     
</div>

  ) : null;
}




      