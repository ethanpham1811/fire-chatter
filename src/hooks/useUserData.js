import { useEffect, useState } from 'react'
import { fetchFriendList, auth } from '../services/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const useUserData = () => {
  const [user, setUser] = useState(null)
  const [friendList, setFriendList] = useState([])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        const data = await fetchFriendList(user.uid)
        setFriendList(data)
      } else {
        setUser(null)
        setFriendList([])
      }
    })
  }, [])

  return [user, friendList]
}

export default useUserData
