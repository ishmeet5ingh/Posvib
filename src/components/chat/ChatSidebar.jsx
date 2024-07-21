import React, {useState} from 'react'
import { ChatUser } from '..'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setHide } from '../../store/hideSlice';

function ChatSidebar() {

  const users = useSelector((state) => state.users.users);
  const [searchUser, setSearchUser] = useState("");
  const currentUser = useSelector(state => state.users.currentUser)

  const dispatch = useDispatch()
  
  const unionSet = new Set([...currentUser?.followers, ...currentUser?.following]);

  const filteredUsers = users?.filter(
    (user) =>
      user?.$id !== currentUser?.$id &&
      unionSet.has(user?.$id) &&
      (
        user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.username.toLowerCase().includes(searchUser.toLowerCase())
      )
  );

  return (
    <div className="bg-black px-5 pt-10 text-white flex justify-center sm:min-h-screen sm:border-r border-teal-800 w-full md:w-[250px]  lg:w-[500px]">
    <div className='w-11/12'>
    {/* Back Button */}
    {/* <BackButton/> */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="mb-5 text-sm w-full p-2 border border-teal-950 text-gray-300 focus:outline-none bg-[#121212] rounded-md"
      />
      {/* Users list */}
      <div className='flex flex-col gap-3'>
        {(filteredUsers?.length > 0) ? (
          filteredUsers.map((user) => (
            <Link 
            onClick={()=>dispatch(setHide(false))}
            key={user?.$id} 
            to={`room/${currentUser?.$id}_${user?.$id}`}
            
            >
            <ChatUser selectedUser={user}/>
            </Link>
          ))
        ) : (
          searchUser &&
          <p>No users found.</p>
        )}
      </div>
    </div>
    </div>
  )
}

export default ChatSidebar