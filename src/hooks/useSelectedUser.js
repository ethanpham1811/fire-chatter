import { useEffect, useState } from 'react'
import { CARD_TITLE, FRIEND_STATUSES } from '../constants/enum'
import { subscribeToFriendship } from '../services/firebase'

const useSelectedUser = (myId, setActiveCard) => {
  const [selectedFsId, setSelectedFsId] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!selectedFsId || !myId) return
    let prevFsStatus = null
    setIsLoading(true)
    const unsubscribe = subscribeToFriendship(selectedFsId, (data) => {
      // check previous FS status to redirect to corresponding card when friend Accept/Remove FS
      if ([FRIEND_STATUSES.SENT, FRIEND_STATUSES.PENDING].includes(prevFsStatus)) {
        if (data?.sender?.friendStatus === FRIEND_STATUSES.ACCEPTED) setActiveCard(CARD_TITLE.CHATBOX)
        if (!data) setActiveCard(CARD_TITLE.CONTACTS)
      }
      // update previous FS status
      prevFsStatus = data?.sender.friendStatus

      // get friend info from FS
      const userData = myId === data?.sender.uid ? data?.receiver : data?.sender
      setSelectedUser(userData)

      // redirect to contacts if friendship got removed
      if (!userData) setActiveCard(CARD_TITLE.CONTACTS)
      setIsLoading(false)
    })
    return () => typeof unsubscribe === 'function' && unsubscribe()
  }, [selectedFsId, myId])

  return [selectedUser, setSelectedUser, setSelectedFsId, isLoading]
}

export default useSelectedUser
