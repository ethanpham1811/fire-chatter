import React, { forwardRef, useEffect, useRef } from 'react'
import Message from '../Message/Message'
import Spinner from '../Spinner/Spinner'

const MessageList = forwardRef(({ isLoading, messages, userId, friendPhoto }, ref) => {
  const dummyRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      messages?.length !== 0 && dummyRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }, 10)
  }, [messages])

  const messagesJsx = (
    <>
      {messages?.length !== 0 ? (
        messages.map((msg, i) => <Message userId={userId} friendPhoto={friendPhoto} key={msg.uid ?? `msg${i}`} message={msg} />)
      ) : (
        <div className="mt-auto my-3 flex justify-center py-2 relative text-[#999] text-sm before:absolute before:top-0 before:m-auto before:w-1/6 before:h-[1px] before:bg-[#999]">
          Let's start the conversation!
        </div>
      )}
    </>
  )
  return (
    <main ref={ref} className="flex flex-1 flex-col gap-2 overflow-y-scroll bg-chatBox mx-[-1.25rem] p-5 shadow-innerChatBox">
      {isLoading ? <Spinner message="Loading messages.." /> : messagesJsx}
      {/* for scroll into view on form submit */}
      <span ref={dummyRef}></span>
    </main>
  )
})

export default MessageList
