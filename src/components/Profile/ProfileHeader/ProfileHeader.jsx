import React from 'react'
import ProfileGenderEditor from '../ProfileGenderEditor/ProfileGenderEditor'
import ProfilePhotoUploader from '../ProfilePhotoUploader/ProfilePhotoUploader'

function ProfileHeader({ user, setUploadPhoto, isMe }) {
  return (
    <header className="relative bg-secondary py-3 px-7">
      <div className=" absolute w-1/3 md:w-1/5 left-7 top-[-70%]">
        <img src={user.photoUrl} alt="User profile photo" className="rounded-full flex-1 aspect-square object-cover" />
        {isMe && <ProfilePhotoUploader setProfilePhoto={setUploadPhoto} />}
      </div>
      <h2 className="flex items-center mt-4">
        {user.displayName}
        <ProfileGenderEditor user={user} isMe={isMe} />
      </h2>
      <p className="mt-3 text-xs">@n AI creator, designer, developer.</p>
    </header>
  )
}

export default ProfileHeader
