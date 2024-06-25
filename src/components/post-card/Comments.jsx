import React, { useEffect } from 'react'
import {Comment} from '..'


function Comments({comments}) {
    console.log("comment", comments)
    
  return (
    <div className='overflow-y-scroll max-h-60 custom-scrollbar scroll-smooth'>
        {comments?.map((comment)=>(
            <div key={comment?.$id} >
            <Comment comment={comment}/>
            </div>
        ))}
    </div>
  )
}

export default Comments