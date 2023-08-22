import React, { useEffect, useState } from 'react'
import { BsCardImage } from 'react-icons/bs'
import { CiSquareRemove } from 'react-icons/ci'
import ImageUploading from 'react-images-uploading'
import { v4 as rid } from 'uuid'
import { MAX_UPLOADS } from '../../constants/enum'

function AttachmentUploader({ setUploads, uploads, msgListRef }) {
  const [images, setImages] = useState(uploads)

  const handleUploadImg = (imageList) => {
    setImages(imageList)

    setUploads(
      imageList.map((el) => {
        return {
          type: 'image',
          url: el.data_url
        }
      })
    )
  }

  /* reset images to [] on sending message */
  useEffect(() => {
    uploads.length === 0 && setImages(uploads)
  }, [uploads])

  return (
    <ImageUploading multiple value={images} onChange={handleUploadImg} maxNumber={MAX_UPLOADS} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => {
        return (
          <div className="flex justify-center items-center">
            <button
              className="p-0 mr-2 border-none rounded-none  bg-secondary"
              // style={isDragging ? { color: 'red' } : undefined}
              onClick={(e) => {
                e.preventDefault()
                onImageUpload()
              }}
            >
              <BsCardImage size={25} />
            </button>

            {/* <div
              {...dragProps}
              style={{ width: msgListRef?.current?.offsetWidth, height: msgListRef?.current?.offsetHeight }}
              className="text-white flex absolute bottom-[calc(29px_+_2.25rem)] left-[-1rem] "
            >
              {isDragging ? 'Drop here please' : 'Upload space'}
            </div> */}

            <div className="absolute flex bottom-[75px] right-0 bg-none gap-1">
              {imageList.map((image, i) => (
                <div key={rid()} className="relative bg-slate-200">
                  <img src={image['data_url']} alt={`upload image ${i}`} width="50" />
                  <div className="absolute flex top-0 right-0 ">
                    <button
                      className="w-4 h-4 p-0 leading-none border-none flex items-center justify-center rounded-none"
                      onClick={() => onImageRemove(i)}
                    >
                      <CiSquareRemove />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    </ImageUploading>
  )
}

export default AttachmentUploader
