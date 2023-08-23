import Compress from 'compress.js'
import React from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import ImageUploading from 'react-images-uploading'
import { UPLOAD_COMPRESS } from '../../../constants/enum'

const compress = new Compress()

function ProfilePhotoUploader({ setProfilePhoto }) {
  const handleUploadPhoto = (img) => {
    const data = img[0].file
    compress.compress([data], UPLOAD_COMPRESS).then((data) => setProfilePhoto(data[0].prefix + data[0].data))
  }

  return (
    <ImageUploading onChange={handleUploadPhoto} dataURLKey="data_url">
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
