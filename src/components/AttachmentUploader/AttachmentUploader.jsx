import Compress from 'compress.js'
import React, { useEffect, useState } from 'react'
import ImageUploading from 'react-images-uploading'
import { v4 as rid } from 'uuid'
import { MAX_UPLOADS, UPLOAD_COMPRESS } from '../../constants/enum'
import { BsCardImage, CiSquareRemove } from '../../utils/icons'

const compress = new Compress()

function AttachmentUploader({ setUploads, uploads, msgListRef }) {
  const [images, setImages] = useState(uploads)

  const handleUploadImg = (imageList) => {
    setImages(imageList)

    compress
      .compress(
        imageList.map((img) => img.file),
        UPLOAD_COMPRESS
      )
      .then((data) => {
        setUploads(
          data.map((img) => {
            return { type: 'image', url: img.prefix + img.data }
          })
        )
      })
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

            <div
              className={`${
                imageList.length !== 0 ? 'flex' : 'hidden'
              } absolute bottom-[60px] w-full justify-end p-2 backdrop-blur-md right-0 bg-none gap-2`}
            >
              {imageList.map((image, i) => (
                <div key={rid()} className="relative flex items-end border-dotted border-[1px]">
                  <img src={image['data_url']} alt={`upload image ${i}`} width="50" className="object-contain" />
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
