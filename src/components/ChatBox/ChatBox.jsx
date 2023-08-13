import React, { useRef, useState } from 'react'

import { Message } from '../'
import { sendMessage } from '../../services/firebase'
import './ChatBox.scss'

function ChatBox({ userId, friendId, messages }) {
  const dummy = useRef()
  // const [messages] = useCollectionData(messagesQuery, { idField: 'id' })
  const [formValue, setFormValue] = useState('')

  const handleSend = async (e) => {
    if (!userId || !friendId || formValue === '') return
    e.preventDefault()
    // const { uid, photoURL } = auth.currentUser

    // await addMessage(formValue, uid, photoURL)
    await sendMessage(userId, friendId, formValue)
    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="chat-box">
      <main>
        {messages && messages.map((msg) => <Message key={msg.id} message={msg} />)}
        {/* for scroll into view on form submit */}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={handleSend}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit" disabled={!formValue}>
          <span role="img" aria-label="send button">
            🕊️
          </span>
        </button>
      </form>
    </div>
  )
}

export default ChatBox
