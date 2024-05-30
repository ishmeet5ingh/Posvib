import React, {useState, useEffect} from 'react'
import { PostCard, PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../store/configSlice'



function MyPosts() {

    const userData = useSelector(state => state.auth.userData)
    const authStatus  = useSelector(state => state.auth.status)
    const dispatch = useDispatch()


    useEffect(() => {
        if(authStatus){
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                  dispatch(setPosts(posts.documents))
                }
            })
        }
    }, [])

    let posts = useSelector(state => state.config.posts?.filter(doc => doc.userId === userData?.$id))

    console.l

 
    return (
      <div className='h-screen overflow-y-scroll hide-scrollbar'>

      <div className='flex flex-col min-h-screen border-r border-teal-800 w-full sm:w-96 md:w-[500px] '>
      <div className='border-b my-16   border-teal-800'>
      <div>
          <PostForm/>
      </div>
      <div className='text-white text-center sticky top-0 bg-black-rgba backdrop-blur-[3px] border-y border-teal-800 py-4'>
            <h3>Posts</h3>
        </div>
          {posts!==null && posts?.map((post) => (
              <div key={post.$id} className='w-full'>
                  <PostCard {...post} />
              </div>
          ))}
      </div>
      </div>
</div>
  )
}

export default MyPosts