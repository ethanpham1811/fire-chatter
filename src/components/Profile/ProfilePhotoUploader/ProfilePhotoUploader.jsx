import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import ImageUploading from 'react-images-uploading'

function ProfilePhotoUploader({ setProfilePhoto }) {
  return (
    <ImageUploading onChange={(img) => setProfilePhoto(img[0].data_url)} dataURLKey="data_url">
      {({ onImageUpload }) => {
        return (
          <button
            className=" border-none  absolute bottom-0 right-0 p-2 bg-darkGray rounded-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              onImageUpload()
            }}
          >
            <AiOutlineCamera size={12} color="#fff" />
          </button>
        )
      }}
    </ImageUploading>
  )
}

export default ProfilePhotoUploader
