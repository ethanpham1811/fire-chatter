import React, { useRef, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { sendMessage } from '../../services/firebase'

function ChatForm({ user, friend, conversationId }) {
  const ref = useRef()
  const [message, setMessage] = useState([])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!user.uid || !friend.uid || message === '') return

    /* request send message */
    await sendMessage(conversationId, user.uid, friend.uid, message, user.photoURL)

    /* reset form & scroll window down */
    setMessage('')
  }
  return (
    <form onSubmit={handleSend} className="relative flex">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        ref={ref}
        type="text"
        placeholder="say something nice"
        className="w-full p-2 pr-2 border-2 rounded-md"
      />
      <button className="cursor-pointer border-none w-max" type="submit" disabled={message === '' || !conversationId}>
        <BsFillSendFill size={25} />
      </button>
    </form>
  )
}

export default ChatForm
