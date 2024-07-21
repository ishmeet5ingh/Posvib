import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../common/BackButton';
import User from './User';

function SearchUser({follow}) {
    
    
  const users = useSelector((state) => state.users.users);
  const [searchUser, setSearchUser] = useState("");


  // based on the follow prop which list to filter
  const listToFilter = follow ? follow : users;

  // Filtered users based on the search user
  const filteredUsers = listToFilter?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.username.toLowerCase().includes(searchUser.toLowerCase())
  );

  
  const isSearchUser = !follow ? searchUser !== "" : users

  return (
    <div className="bg-black pt-10 text-white flex justify-center sm:min-h-screen sm:border-r border-teal-800 w-full sm:w-[350px] md:w-[450px] lg:w-[500px]">
    <div className='w-11/12'>
    <div className='flex gap-4 mb-5'>
    <BackButton/>
    {/* Back Button */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
       className="  w-full p-2 border border-teal-950 text-gray-300 focus:outline-none bg-[#121212] rounded-md"
      />
    </div>
      {/* Users list */}
      <ul className='pl-5'>
        {(filteredUsers?.length > 0) && isSearchUser  ? (
          filteredUsers.map((user) => (
            <li key={user?.$id}>
              <User user={user} imageClasses={`w-11 h-11 mr-3`}/>
            </li>
          ))
        ) : (
          searchUser &&
          <p>No users found.</p>
        )}
      </ul>
    </div>
    </div>
  );
};


export default SearchUser