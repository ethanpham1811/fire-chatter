import React, { useEffect, useState } from 'react'

import { subscribeToMessages } from '../../services/firebase'
import { ChatForm, MessageList, UserNav } from '../../components'
import { useConversationId } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function RightCard({ user, friend }) {
  // if (!friend) return <div>loading..</div>

  const [messages, setMessages] = useState([])
  const [conversationId] = useConversationId(user.uid, friend.uid)

  useEffect(() => {
    const unsubscribe = subscribeToMessages(conversationId, (updatedMsg) => setMessages(updatedMsg))
    return () => unsubscribe()
  }, [conversationId])

  return (
    <section className="flex flex-col gap-5 w-[30vw] h-[70vh]">
      <header className="flex items-center">
        <UserNav hasBack={true} user={friend} hasLogout={false} />
      </header>
      <MessageList messages={messages} userId={user.uid} />
      <ChatForm user={user} friend={friend} conversationId={conversationId} />
    </section>
  )
}

export default WithCard(RightCard)
