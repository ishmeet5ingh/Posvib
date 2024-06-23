import React from 'react'
import { useSelector } from 'react-redux'
import {useParams } from 'react-router-dom'
import { SearchUser } from '../components'



function Followers() {

    const { username } = useParams()
    const users = useSelector(state => state.users.users)
    const userData = useSelector(state => state.users.users?.find((user)=> user?.usernaume?.toLowerCase() === username?.toLowerCase()));
    console.log("userData", userData)

    const followers = users?.filter(user => userData?.followers?.includes(user?.$id))

  return (
    <SearchUser follow={followers} user={userData}/>
  )
}

export default Followers