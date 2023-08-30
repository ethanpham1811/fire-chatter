import { useEffect, useState } from 'react'
import { subscribeToMessages } from '../services/firebase'

const useMessages = (conversationId, cb) => {
  const [messages, setMessages] = useState([])

  /* messages subscription */
  useEffect(() => {
    const unsubscribe = subscribeToMessages(conversationId, (updatedMsg) => {
      setMessages(updatedMsg)
      cb(false)
    })
    return () => unsubscribe()
  }, [conversationId])

  return [messages]
}

export default useMessages
