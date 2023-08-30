import { useEffect, useState } from 'react'
import { fetchUserDetail } from '../services/firebase'

const useUserInfo = (userId, friendStatus, cb) => {
  const [userIsLoading, setUserIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  /* fetch user info */
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserDetail(userId)
      setUser({ ...data, friendStatus })
      setUserIsLoading(false)
    }
    if (userId) {
      cb(true)
      setUserIsLoading(true)
      fetchUser()
    }
  }, [userId])
  return [userIsLoading, user]
}

export default useUserInfo
