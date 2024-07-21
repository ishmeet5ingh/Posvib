import React,{useEffect, useState} from 'react'
import {UserEditButton, UserEditInput} from '../..';


function BioEditForm({
  handleSubmit,
  currentUser,
  users
}) {
  const [bio, setBio] = useState(currentUser?.bio);
  const [loadingBio, setLoadingBio] = useState(false);
  const [bioError, setBioError] = useState("");

  useEffect(()=> {
    setBio(currentUser?.bio)
  }, [currentUser])

  const handleBioSubmit = (e) => {
    e.preventDefault();
    if (bio.length > 130) {
      setBioError("Cannot exceed 130 characters");
    } else {
      setBioError("");
      handleSubmit({ bio: bio }, setLoadingBio);
    }
  };


 
  return (
    <form onSubmit={handleBioSubmit}>
    <div className="relative mb-5">
      <UserEditInput
        label="Bio: "
        value={bio}
        disabled={loadingBio}
        onChange={(e) => {
          setBio(e.target.value);
          setBioError("");
        }}
      />
      {bioError && <p className="text-red-500 text-sm">{bioError}</p>}
      <UserEditButton loading={loadingBio} />
    </div>
  </form>
  )
}

export default BioEditForm