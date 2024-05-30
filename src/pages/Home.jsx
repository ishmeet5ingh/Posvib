import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {PostCard, PostForm} from '../components'
import {useDispatch, useSelector} from 'react-redux'
import '../index.css'
import { setPosts, deleteAllPost } from '../store/configSlice'


function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
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

    let posts = useSelector(state => state.config.posts)
    console.log(posts)
    
    useEffect(()=>{
        if(!authStatus){
            dispatch(deleteAllPost())
        }
    },[authStatus])

  
    if (posts === null && authStatus !== "false") {
        return (
            <div className="py-8 sm:w-96 text-center min-h-screen">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-white">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
            </div>
        )

    }else{
        return (
            <div className='h-screen overflow-y-scroll hide-scrollbar'>
    
            <div className='flex flex-col min-h-screen border-r border-teal-800 w-full sm:w-96 md:w-[500px]'>
            <div className='border-b my-16   border-teal-800'>
            <div>
                <PostForm/>
            </div>
            <div className='text-white text-center sticky top-0 bg-black-rgba backdrop-blur-[3px] border-y border-teal-800 py-4'>
                <h3>Posts</h3>
            </div>
                {posts!==null && posts.map((post, index) => (
                    <div key={post?.$id} className='w-full'>
                        <PostCard {...post} idx={index}/>
                    </div>
                ))}
            </div>
            </div>
    </div>
        )
    }
}

export default Home