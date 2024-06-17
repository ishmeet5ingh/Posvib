import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, PostCard, PostCardSkeletonLoading, PostsContainer } from "../components";
import { useSelector } from "react-redux";
import "../index.css";

export default function Post() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const posts = useSelector((state) => state.config.posts);

  useEffect(() => {
    if (id) {
      posts && posts.map((post) => id === post?.$id && setPost(post));
    } else navigate("/");
  }, [id, navigate]);

  return (
    <div className=" h-screen overflow-y-scroll hide-scrollbar flex flex-col min-h-screen border-r border-teal-800 w-full sm:w-[390px] md:w-[450px] lg:w-[550px]">
      <div className=" mt-16 mb-28 border-y border-teal-800">
      {post ? <PostCard {...post} />
      : <PostCardSkeletonLoading/>
      }
      </div>
    </div>
  )
}
