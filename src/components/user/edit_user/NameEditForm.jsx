import React, { useEffect, useState } from 'react'
import {UserEditButton, UserEditInput} from '../..';


function NameEditForm({
  handleSubmit,
  currentUser
}) {
  const [name, setName] = useState(currentUser?.name);
  const [nameError, setNameError] = useState("");
  const [loadingName, setLoadingName] = useState(false);

  useEffect(()=> {
    setName(currentUser?.name)
  }, [currentUser])

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Name is required");
    } else if (!/^[A-Za-z0-9\s]+$/.test(name)) {
      setNameError("Name can only contain letters, numbers and spaces");
    } else if (name.length < 2) {
      setNameError("Must be at least 2 characters long");
    } else if (name.length > 30) {
      setNameError("Cannot exceed 30 characters");
    } else {
      setNameError("");
      handleSubmit({ name: name }, setLoadingName);
    }
  };
  return (
    <form onSubmit={handleNameSubmit}>
          <div className="relative mb-4">
            <UserEditInput
              label="Name: "
              value={name}
              disabled={loadingName}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            <UserEditButton loading={loadingName} />
          </div>
        </form>
  )
}

export default NameEditForm