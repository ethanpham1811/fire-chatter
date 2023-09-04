import { useEffect, useState } from 'react'
import { subscribeToMessages } from '../services/firebase'

const useMessages = (conversationId) => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  /* messages subscription */
  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = subscribeToMessages(conversationId, (updatedMsg) => {
      setMessages(updatedMsg)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [conversationId])

  return [messages, isLoading]
}

export default useMessages
