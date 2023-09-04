import React, { useRef, useState } from 'react'
import ChatForm from '../../components/ChatBox/ChatForm/ChatForm'
import MessageList from '../../components/ChatBox/MessageList/MessageList'
import UserNav from '../../components/UserNav/UserNav'
import { useConversationId, useMessages } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function ChatBoxWrapper({ user, friend }) {
  /* states */
  const [msgIsLoading, setMsgIsLoading] = useState(true)
  /* custom hooks */
  const [conversationId] = useConversationId(user.uid, friend.uid)
  const [messages] = useMessages(conversationId, setMsgIsLoading)
  /* refs */
  const msgListRef = useRef(null)

  return (
    <section
      className="flex flex-col gap-5 p-5 w-screen h-screen 
                xs:w-[70vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] 
                xs:max-h-[70vh] lg:min-h-[550px]"
    >
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
    </section>
  )
}

export default WithCard(ChatBoxWrapper)
