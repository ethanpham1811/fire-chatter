import { useEffect, useState } from 'react'
import { fetchFriendList } from '../services/firebase'

const useContactList = (userId) => {
  const [friendList, setFriendList] = useState([])

  useEffect(() => {
    const requestdata = async () => {
      const data = await fetchFriendList(userId)
      setFriendList(data)
    }
    requestdata()
  }, [])

  return friendList
}

export default useContactList
