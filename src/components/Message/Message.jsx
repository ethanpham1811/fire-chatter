import React from 'react'

function Message({ userId, message }) {
  const { content, sender, photoUrl } = message
  const senderStyle = 'rounded-br-none justify-self-end bg-darkGray text-white'
  const receiverStyle = 'rounded-bl-none bg-white'
  const isMe = sender === userId
  const style = isMe ? senderStyle : receiverStyle

  return (
    <div className="grid">
      {!isMe && <img alt="user avatar" src={photoUrl} className={`${style} w-8 rounded-full `} />}
      <p className={`${style} max-w-[50%] p-3 shadow-card rounded-2xl`}>{content}</p>
    </div>
  )
}

export default Message
