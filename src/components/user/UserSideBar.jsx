import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserSideBarSkeleton from './skeleton/UserSideBarSkeleton';
import User from './User';

function UserSideBar() {
  const [searchUser, setSearchUser] = useState("");

  // Redux state selectors
  const currentUser = useSelector((state) => state.users.currentUser);
  const loading = useSelector((state) => state.loading.isLoading);
  const users = useSelector((state) => state.users.users);
  

  // Filter users based on search input and exclude the current user
  const filteredUsers = users?.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.username.toLowerCase().includes(searchUser.toLowerCase())) &&
      user !== currentUser
  );

  return (
    <div className="bg-black pt-16 ssm:pl-6 sm:pl-5 lg:pl-6 xl:pl-14 text-white hidden xs:block">

      <ul>
        {loading ? (
          // skeleton loaders 
          Array.from({ length: 3 }).map((_, index) => (
            <UserSideBarSkeleton key={index} />
          ))
        ) : (
          filteredUsers?.length > 0 ? (
            filteredUsers.map((user) => (
              <li key={user?.$id}>
                <User 
                  user={user}
                  text="text-xs md:text-sm"
                  imageClasses="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 mr-1 md:mr-2"
                  classname="w-full"
                  flexCol="flex-col gap-2"
                />
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )
        )}
      </ul>
    </div>
  );
}

export default UserSideBar;
