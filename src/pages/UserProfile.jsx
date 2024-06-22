import React, { useEffect, useState } from 'react'
import { Profile } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


function UserProfile() {
    const [user, setUser] = useState(null)
    const {username} = useParams()
    const navigate = useNavigate()
    const users = useSelector(state => state.users.users)

    useEffect(() => {
        if (username) {
            users && users.map((user) => username.toLowerCase() === user?.$id.toLowerCase() && setUser(user));
    
        } else navigate("/");
    }, [username, navigate])

  return (
    <div>
    <Profile user={user}/>
    </div>
  )
}

export default UserProfile