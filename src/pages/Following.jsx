import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SearchUser } from '../components';


function Following() {
    const { username } = useParams()
    const users = useSelector(state => state.users.users)
    const userData = useSelector(state => state.users.users?.find((user)=> user?.username?.toLowerCase() === username?.toLowerCase()));
    console.log("userData", userData)

    const following = users?.filter(user => userData?.following?.includes(user?.$id))

  return (
    <SearchUser follow={following}/>
  )
}

export default Following