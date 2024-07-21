import React,{useEffect, useState} from 'react'
import {UserEditButton, UserEditInput} from '../..';

function UsernameEditForm({
  handleSubmit,
  currentUser,
  users
}) {
  const [username, setUsername] = useState(currentUser?.username);
  const [loadingUsername, setLoadingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  useEffect(()=> {
    setUsername(currentUser?.username)
  }, [currentUser])

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    const isUsernameTaken = users.some(
      (user) => user.username === username && user.$id !== currentUser.$id
    );
    if (isUsernameTaken) {
      setUsernameError("Username is already taken");
    } else if (username === "") {
      setUsernameError("Username is required");
    } else if (!/^[A-Za-z0-9_]+$/.test(username)) {
      setUsernameError(
        "Username can only contain letters, numbers, and underscores"
      );
    } else if (username.length < 2) {
      setUsernameError("Must be at least 2 characters long");
    } else if (username.length > 30) {
      setUsernameError("Cannot exceed 30 characters");
    } else {
      setUsernameError("");
      handleSubmit({ username: username }, setLoadingUsername);
    }
  };

  return (
    <form onSubmit={handleUsernameSubmit}>
    <div className="relative mb-4">
      <UserEditInput
        label="Username: "
        value={username}
        disabled={loadingUsername}
        onChange={(e) => {
          setUsername(e.target.value);
          setUsernameError("");
        }}
      />
      {usernameError && (
        <p className="text-red-500 text-sm">{usernameError}</p>
      )}
      <UserEditButton loading={loadingUsername} />
    </div>
  </form>
  )
}

export default UsernameEditForm