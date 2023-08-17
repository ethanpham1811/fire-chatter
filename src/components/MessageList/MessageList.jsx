import React, { forwardRef, useEffect, useRef } from 'react'
import Message from '../Message/Message'

const MessageList = forwardRef(({ messages, userId }, ref) => {
  const dummyRef = useRef()

  useEffect(() => dummyRef.current.scrollIntoView({ behavior: 'smooth' }), [messages])

  return (
    <main ref={ref} className="flex flex-1 flex-col gap-2 overflow-y-scroll bg-chatBox mx-[-1.25rem] px-5 shadow-innerChatBox">
      {messages ? messages.map((msg, i) => <Message userId={userId} key={msg.uid ?? `msg${i}`} message={msg} />) : null}
      {/* for scroll into view on form submit */}
      <span ref={dummyRef}></span>
    </main>
  )
})

export default MessageList
