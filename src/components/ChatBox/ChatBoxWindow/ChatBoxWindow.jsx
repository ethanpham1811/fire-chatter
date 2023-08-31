import React, { useRef, useState } from 'react'
import { useConversationId, useMessages } from '../../../hooks'
import UserNav from '../../UserNav/UserNav'
import ChatForm from '../ChatForm/ChatForm'
import MessageList from '../MessageList/MessageList'

function ChatBoxWindow({ user, friend }) {
  /* states */
  const [msgIsLoading, setMsgIsLoading] = useState(true)
  /* custom hooks */
  const [conversationId] = useConversationId(user.uid, friend.uid)
  const [messages] = useMessages(conversationId, setMsgIsLoading)
  /* refs */
  const msgListRef = useRef(null)

  return (
    <>
      <header className="flex items-center">
        <UserNav hasBack={true} user={friend} isMe={false} />
      </header>
      <MessageList
        isLoading={msgIsLoading}
        ref={(ref) => (msgListRef.current = ref)}
        messages={messages}
        userId={user.uid}
        friendPhoto={friend.photoUrl}
      />
      <ChatForm isLoading={msgIsLoading} user={user} friend={friend} conversationId={conversationId} msgListRef={msgListRef} />
    </>
  )
}

export default ChatBoxWindow
