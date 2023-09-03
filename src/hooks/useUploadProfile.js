import { useEffect, useState } from 'react'
import { editUser } from '../services/firebase'

const useUploadProfile = (user) => {
  const [uploadCover, setUploadCover] = useState(null)
  const [uploadPhoto, setUploadPhoto] = useState(null)

  useEffect(() => {
    uploadCover && editUser({ ...user, coverUrl: uploadCover })
  }, [uploadCover])

  useEffect(() => {
    uploadPhoto && editUser({ ...user, photoUrl: uploadPhoto })
  }, [uploadPhoto])

  return [setUploadCover, setUploadPhoto]
}

export default useUploadProfile
