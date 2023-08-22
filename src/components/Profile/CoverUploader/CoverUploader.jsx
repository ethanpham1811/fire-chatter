import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import ImageUploading from 'react-images-uploading'

function CoverUploader({ setCover }) {
  return (
    <ImageUploading onChange={(img) => setCover(img[0].data_url)} dataURLKey="data_url">
      {({ onImageUpload }) => {
        return (
          <button
            className="p-0 mr-0 border-none bg-transparent absolute right-2 top-2 cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              onImageUpload()
            }}
          >
            <AiFillEdit size={20} />
          </button>
        )
      }}
    </ImageUploading>
  )
}

export default CoverUploader
