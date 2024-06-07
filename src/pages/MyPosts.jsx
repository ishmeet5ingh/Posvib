import React from "react";
import { PostCard, PostCardSkeletonLoading, PostsContainer } from "../components";
import { useSelector, useDispatch } from "react-redux";

function MyPosts() {
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  let posts = useSelector((state) => state.config.posts);

  console.log("posts", posts);
  return (
    <>
      <PostsContainer>
      {authStatus &&
        posts === null &&
        [1, 2, 3, 4]?.map((_, index) => (
          <div key={index} className="w-full">
            <PostCardSkeletonLoading />
          </div>
        ))}
        
        {posts !== null &&
          posts.map((post, index) => (
            <div key={post?.$id} className="w-full">
              {post.userId === userData?.$id && (
                <PostCard {...post} idx={index} />
              )}
            </div>
          ))}
      </PostsContainer>
    </>
  );
}

export default MyPosts;
