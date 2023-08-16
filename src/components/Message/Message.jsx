import React from 'react'

function Message({ userId, message }) {
  const { content, sender, photoUrl, uploads } = message
  const isMe = sender === userId
  /* text & user icon styles */
  const senderStyle = 'rounded-br-none justify-self-end bg-darkGray text-white'
  const receiverStyle = 'rounded-bl-none bg-white'
  const style = isMe ? senderStyle : receiverStyle
  /* uploads styles */
  const uploadSenderStyle = 'justify-self-end'

  return (
    <div className={`grid ${!isMe && 'grid-cols-[max-content_70%] items-end'}`}>
      {!isMe && <img alt="user avatar" src={photoUrl} className={`w-8 rounded-full float-left mr-3`} />}
      <p className={`${style} ${isMe && 'max-w-[70%]'} w-fit p-3 shadow-card rounded-2xl`}>{content}</p>
      {uploads ? uploads.map((file) => <img key={file.url.substring(0, 5)} src={file.url} className={`${isMe && uploadSenderStyle} w-1/2`} />) : ''}
    </div>
  )
}

export default Message
