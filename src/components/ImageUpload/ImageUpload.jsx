import React, { useEffect } from 'react'
import { BsCardImage } from 'react-icons/bs'
import { CiSquareRemove } from 'react-icons/ci'
import ImageUploading from 'react-images-uploading'

function ImageUpload({ setUploads, uploads }) {
  const [images, setImages] = React.useState(uploads)
  const maxNumber = 5

  const handleUploadImg = (imageList, addUpdateIndex) => {
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

  useEffect(() => {
    uploads.length === 0 && setImages(uploads)
  }, [uploads])

  return (
    <ImageUploading multiple value={images} onChange={handleUploadImg} maxNumber={maxNumber} dataURLKey="data_url">
      {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
        // write your building UI
        <div>
          <button
            className="pl-0 border-none focus:outline-none bg-white"
            style={isDragging ? { color: 'red' } : undefined}
            onClick={(e) => {
              e.preventDefault()
              onImageUpload()
            }}
            {...dragProps}
          >
            <BsCardImage size={25} />
          </button>
          <div className="absolute flex bottom-[75px] right-0 bg-none gap-1">
            {imageList.map((image, i) => (
              <div key={i} className="relative bg-slate-200">
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
      )}
    </ImageUploading>
  )
}

export default ImageUpload
