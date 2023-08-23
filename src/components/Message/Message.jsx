import React from 'react'
import { v4 as rid } from 'uuid'

function Message({ userId, message, friendPhoto }) {
  const { content, sender, uploads } = message
  const isMe = sender === userId
  /* message styles */
  const senderMsgStyle = 'rounded-br-none bg-darkGray text-white ml-auto'
  const receiverMsgStyle = 'rounded-bl-none bg-white mr-auto'
  const msgStyle = isMe ? senderMsgStyle : receiverMsgStyle
  /* uploads styles */
  const senderUploadStyle = 'ml-auto'
  const receiverUploadStyle = 'mr-auto ml-11'
  const uploadStyle = isMe ? senderUploadStyle : receiverUploadStyle

  return (
    <div className="flex flex-col first:mt-auto gap-2">
      {isMe ? (
        <>{content && content !== '' && <p className={`${msgStyle} max-w-[70%] w-fit p-3 rounded-2xl shadow-message`}>{content}</p>}</>
      ) : (
        <>
          <div className="flex">
            <img alt="user avatar" src={friendPhoto} className="w-8 h-8 rounded-full mr-3" />
            {content && content !== '' && <p className={`${msgStyle} max-w-[70%] w-fit p-3 rounded-2xl shadow-message`}>{content}</p>}
          </div>
        </>
      )}
      {uploads ? uploads.map((file) => <img key={rid()} src={file.url} className={`${uploadStyle} w-1/2 `} />) : ''}
    </div>
  )
}

export default Message
