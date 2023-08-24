import { useEffect, useState } from 'react'
import { getConversationId } from '../services/firebase'

const useConversationId = (userId, friendId) => {
  const [conversationId, setConversationId] = useState(null)

  useEffect(() => {
    if (!userId || !friendId) return
    async function getId() {
      const id = await getConversationId(userId, friendId)
      setConversationId(id)
    }
    getId()
  }, [friendId])

  return [conversationId]
}

export default useConversationId
