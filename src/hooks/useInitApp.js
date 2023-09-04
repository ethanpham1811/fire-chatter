import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, subscribeToUser } from '../services/firebase'

const useInitApp = () => {
  const [authUser, isLoading] = useAuthState(auth)
  const [userIsLoading, setUserIsLoading] = useState(true)
  const [me, setMe] = useState(null)
  // set init state for framer motion animation
  const [isMounted, setIsMounted] = useState(false)

  /* current user subscription */
  useEffect(() => {
    if (!authUser) return
    const unsubscribe = subscribeToUser(authUser.uid, async (user) => {
      /* retrieve & set token if user has no token */
      // if (!user.deviceToken) {
      //   const token = await getMessagingToken()
      //   editUser({ deviceToken: token }, authUser.uid)
      // }
      setUserIsLoading(false)
      setMe(user)
    })
    return () => unsubscribe()
  }, [authUser])

  /* delaytime between motion initial animation & main animation (only happend once on initial load) */
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1000)
  }, [])

  return [authUser, me, isMounted, isLoading, userIsLoading]
}

export default useInitApp
