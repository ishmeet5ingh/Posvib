import React from 'react'
import { useParams } from 'react-router-dom'

function Following() {

    const {username} = useParams
    
  return (
    <div>Following</div>
  )
}

export default Following