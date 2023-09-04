import React, { useRef, useState } from 'react'
import { sendMessage } from '../../../services/firebase'
import { getFirstWord } from '../../../utils'
import { BsFillSendFill } from '../../../utils/icons'
import AttachmentUploader from '../AttachmentUploader/AttachmentUploader'

function ChatForm({ isLoading, user, friend, conversationId, msgListRef }) {
  const ref = useRef()
  const [message, setMessage] = useState('')
  const [uploads, setUploads] = useState([])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!user.uid || !friend.uid || (message === '' && uploads.length === 0)) return

    /* request send message */
    const senderName = getFirstWord(user.displayName)
    await sendMessage(conversationId, user, friend, message, uploads, senderName)

    /* reset form & scroll window down */
    setUploads([])
    setMessage('')
  }

  return (
    <div className="flex flex-col relative">
      <AttachmentUploader setUploads={setUploads} uploads={uploads} className="w-min" msgListRef={msgListRef} />
      <form onSubmit={handleSend} className="relative flex flex-1 pl-[35px]">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          ref={ref}
          type="text"
          placeholder="say something nice"
          className="w-full p-2 pr-2 border-2 rounded-md text-sm"
          disabled={isLoading}
        />
        <button
          className="cursor-pointer border-none w-max p-2 ml-1 mr-[-10px]"
          type="submit"
          disabled={(message === '' && uploads.length === 0) || !conversationId}
        >
          <BsFillSendFill size={20} />
        </button>
      </form>
    </div>
  )
}

export default ChatForm
