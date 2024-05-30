import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {LoadingSpinner, PostCard} from '../components'
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

  
    if (posts === null) {
        return (
            <div className="py-8 sm:w-96 text-center min-h-screen">
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-white">
                            {authStatus ? (
                                <h1>
                                    Loading...
                                </h1>
                            ): (
                                <h1>
                                Login to read posts
                                </h1>
                            )}
                            </h1>
                        </div>
                    </div>
            </div>
        )

    }else{
        return (
           <>
             {posts!==null && posts.map((post, index) => (
                <div key={post?.$id} className='w-full'>
                    <PostCard {...post} idx={index}/>
                </div>
            ))}
           </>
        )
    }
}

export default Home