import React from 'react'

import './Message.scss'
import { auth } from '../../services/firebase'

function Message({ message }) {
  const { content, uid, photoURL } = message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img alt="user avatar" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{content}</p>
      </div>
    </>
  )
}

export default Message
