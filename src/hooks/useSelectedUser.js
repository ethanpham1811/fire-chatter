import { useEffect, useState } from 'react'
import { subscribeToFriendship } from '../services/firebase'

const useSelectedUser = (myId) => {
  const [selectedFsId, setSelectedFsId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!selectedFsId || !myId) return
    setIsLoading(true)
    const unsubscribe = subscribeToFriendship(selectedFsId, (data) => {
      const userData = myId === data?.sender.uid ? data?.receiver : data?.sender
      setSelectedUser(userData)
      setIsLoading(false)
    })
    return () => typeof unsubscribe === 'function' && unsubscribe()
  }, [selectedFsId, myId])

  return [selectedUser, setSelectedUser, setSelectedFsId, isLoading]
}

export default useSelectedUser
