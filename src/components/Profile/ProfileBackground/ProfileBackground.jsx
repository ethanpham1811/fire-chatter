import React from 'react'
import defaultCoverUrl from '../../../assets/cover_default.jpg'

function ProfileBackground({ user, coverSize }) {
  return (
    <div
      style={{ backgroundSize: coverSize, backgroundImage: `url(${user.coverUrl || defaultCoverUrl}` }}
      className="bg-no-repeat bg-center absolute inset-0 ease-in-expo duration-500 w-screen h-screen md:w-[25vw] md:max-h-[70vh] grayscale bg-50"
    />
  )
}

export default ProfileBackground
