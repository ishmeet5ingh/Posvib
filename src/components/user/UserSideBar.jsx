import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import UserSideBarSkeleton from './skeleton/UserSideBarSkeleton';


function UserSideBar() {
  const currentUser = useSelector(state => state.users.currentUser)
  const loading = useSelector(state => state.loading.isLoading)
  const users = useSelector((state) => state.users.users);
  const [searchUser, setsearchUser] = useState("");

  // Filtered users based on the search user
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="bg-black p-3 pt-16 md:pl-5 lg:pl-10 text-white hidden xs:block">
      <ul>
      {loading ? (
          // skeleton loaders when loading
          Array.from({ length: 3 }).map((_, index) => (
            <UserSideBarSkeleton key={index} />
          ))
        ): (
          filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            (user !== currentUser)  && (
              <li key={user?.$id} >
            <Link to={`/user/${user?.username}`} className='flex items-center mb-4'>
              <img
                src={user.imageUrl}
                alt={`${user.name}'s profile`}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-medium text-sm md:text-base">{user?.name}</p>
                <p className="text-gray-400 text-xs md:text-sm">@{user?.username}</p>
              </div>
            </Link>
            </li>
            )
           
          ))
        ) : (
          <p>No users found.</p>
        )
        )}
        
      </ul>
    </div>
  );
};


export default UserSideBar