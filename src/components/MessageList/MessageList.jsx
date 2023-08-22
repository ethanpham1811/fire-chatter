import React, { forwardRef, useEffect, useRef } from 'react'
import Message from '../Message/Message'

const MessageList = forwardRef(({ messages, userId }, ref) => {
  const dummyRef = useRef()

  useEffect(() => {
    messages.length !== 0 && dummyRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <main ref={ref} className="flex flex-1 flex-col gap-2 overflow-y-scroll bg-chatBox mx-[-1.25rem] px-5 shadow-innerChatBox">
      {messages?.length !== 0 ? (
        messages.map((msg, i) => <Message userId={userId} key={msg.uid ?? `msg${i}`} message={msg} />)
      ) : (
        <div className="mt-auto my-3 flex justify-center py-2 relative text-[#999] text-sm before:absolute before:top-0 before:m-auto before:w-1/6 before:h-[1px] before:bg-[#999]">
          Let's start the conversation!
        </div>
      )}
      {/* for scroll into view on form submit */}
      <span ref={dummyRef}></span>
    </main>
  )
})

export default MessageList
