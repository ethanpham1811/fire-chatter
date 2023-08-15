import React, { useEffect, useRef } from 'react'
import Message from '../Message/Message'

function MessageList({ messages, userId }) {
  const ref = useRef()

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <main className="flex flex-col gap-2 overflow-y-scroll bg-slate-100 mx-[-1.25rem] px-5">
      {messages ? messages.map((msg, i) => <Message userId={userId} key={msg.uid ?? i} message={msg} />) : null}
      {/* for scroll into view on form submit */}
      <span ref={ref}></span>
    </main>
  )
}

export default MessageList
