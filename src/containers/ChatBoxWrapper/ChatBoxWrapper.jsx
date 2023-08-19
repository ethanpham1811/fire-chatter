import React, { useEffect, useRef, useState } from 'react'

import { ChatForm, MessageList, UserNav } from '../../components'
import { useConversationId } from '../../hooks'
import { subscribeToMessages } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function ChatBoxWrapper({ user, friend }) {
  const [messages, setMessages] = useState([])
  const [conversationId] = useConversationId(user.uid, friend.uid)
  const msgListRef = useRef(null)

  /* messages subscription */
  useEffect(() => {
    const unsubscribe = subscribeToMessages(conversationId, (updatedMsg) => setMessages(updatedMsg))
    return () => unsubscribe()
  }, [conversationId])

  return (
    <section className="flex flex-col gap-5 p-5 w-screen h-screen md:w-[25vw] md:max-h-[70vh]">
      <header className="flex items-center">
        <UserNav hasBack={true} user={friend} isMe={false} />
      </header>
      <MessageList ref={(ref) => (msgListRef.current = ref)} messages={messages} userId={user.uid} />
      <ChatForm user={user} friend={friend} conversationId={conversationId} msgListRef={msgListRef} />
    </section>
  )
}

export default WithCard(ChatBoxWrapper)
