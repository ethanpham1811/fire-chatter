import Compress from 'compress.js'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import ImageUploading from 'react-images-uploading'
import { UPLOAD_COMPRESS } from '../../../constants/enum'

const compress = new Compress()

function CoverUploader({ setCover }) {
  const handleUploadPhoto = (img) => {
    const data = img[0].file
    compress.compress([data], UPLOAD_COMPRESS).then((data) => setCover(data[0].prefix + data[0].data))
  }
  return (
    <ImageUploading onChange={handleUploadPhoto} dataURLKey="data_url">
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
