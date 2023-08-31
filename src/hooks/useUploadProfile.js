import { useEffect, useState } from 'react'
import { editUser } from '../services/firebase'

const useUploadProfile = (user) => {
  const [uploadCover, setUploadCover] = useState(null)
  const [uploadPhoto, setUploadPhoto] = useState(null)

  useEffect(() => {
    uploadCover && editUser({ ...user, coverUrl: uploadCover }, user.uid)
  }, [uploadCover])

  useEffect(() => {
    uploadPhoto && editUser({ ...user, photoUrl: uploadPhoto }, user.uid)
  }, [uploadPhoto])

  return [setUploadCover, setUploadPhoto]
}

export default useUploadProfile
