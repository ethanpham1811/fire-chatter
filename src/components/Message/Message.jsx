import React from 'react'
import { v4 as rid } from 'uuid'

function Message({ userId, message, friendPhoto, myLastMsg }) {
  const { content, sender, uploads, timestamp } = message
  const isMe = sender === userId
  /* message styles */
  const senderMsgStyle = 'rounded-br-none bg-darkGray text-white ml-auto'
  const receiverMsgStyle = 'rounded-bl-none bg-white mr-auto'
  const msgStyle = isMe ? senderMsgStyle : receiverMsgStyle
  /* uploads styles */
  const senderUploadStyle = 'ml-auto'
  const receiverUploadStyle = 'mr-auto ml-11'
  const uploadStyle = isMe ? senderUploadStyle : receiverUploadStyle

  const dateTimeJxs = (
    <div className="pl-2 text-xs flex">
      {message.sender !== userId && message.senderName && message.senderName + ', '}
      {new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }).format(timestamp)}
    </div>
  )

  return (
    <div className="flex flex-col first:mt-auto gap-2">
      {isMe ? (
        <>
          {content && content !== '' && (
            <div className="flex flex-col max-w-[70%] w-fit gap-1 ml-auto">
              {dateTimeJxs}
              <p className={`${msgStyle} p-3 rounded-2xl shadow-message`}>{content}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex items-end">
            {myLastMsg ? <img alt="user avatar" src={friendPhoto} className="w-8 h-8 rounded-full mr-3" /> : <div className="w-8 h-8 mr-3"></div>}
            <div className="flex flex-col max-w-[70%] w-fit gap-1">
              {dateTimeJxs}
              {content && content !== '' && <p className={`${msgStyle} p-3 rounded-2xl shadow-message`}>{content}</p>}
            </div>
          </div>
        </>
      )}
      {uploads ? uploads.map((file) => <img key={rid()} src={file.url} className={`${uploadStyle} w-1/2 `} />) : ''}
    </div>
  )
}

export default Message
