import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../Input';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function UserSideBar() {
    

    const users = useSelector((state) => state.users.users);
    const [searchUser, setSearchUser] = useState("");

  // Filtered users based on the search term
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="bg-black p-10 text-white min-h-screen sm:border-r border-teal-800 w-full sm:w-[390px] md:w-[450px] lg:w-[550px]">
    <div >
    <h1 className="text-2xl font-bold mb-4">Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="w-full max-w-96 mb-5 text-black p-2 border border-gray-300 rounded-md"
      />
      <ul>
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.$id}>
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
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>
    </div>
    </div>
  );
};


export default UserSideBar