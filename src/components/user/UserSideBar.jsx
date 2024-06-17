import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


function UserSideBar() {
    

    const users = useSelector((state) => state.users.users);
    const [searchTerm, setSearchTerm] = useState("");

  // Filtered users based on the search term
  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-black p-3 pt-16 md:pl-5 lg:pl-10 text-white hidden sm:block">
      <ul>
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.$id} >
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
  );
};


export default UserSideBar