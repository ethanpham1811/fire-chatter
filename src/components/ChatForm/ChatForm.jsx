import React, { useRef, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { sendMessage } from '../../services/firebase'
import ImageUpload from '../ImageUpload/ImageUpload'

function ChatForm({ user, friend, conversationId, msgListRef }) {
  const ref = useRef()
  const [message, setMessage] = useState([])
  const [uploads, setUploads] = useState([])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!user.uid || !friend.uid || message === '') return

    /* request send message */
    await sendMessage(conversationId, user.uid, friend.uid, message, user.photoURL, uploads)

    /* reset form & scroll window down */
    setUploads([])
    setMessage('')
  }

  return (
    <div className="flex relative">
      <ImageUpload setUploads={setUploads} uploads={uploads} className="w-min" msgListRef={msgListRef} />
      <form onSubmit={handleSend} className="relative flex flex-1">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          ref={ref}
          type="text"
          placeholder="say something nice"
          className="w-full p-2 pr-2 border-2 rounded-md text-sm"
        />
        <button className="cursor-pointer border-none w-max p-2 ml-1 mr-[-10px]" type="submit" disabled={message === '' || !conversationId}>
          <BsFillSendFill size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatForm
