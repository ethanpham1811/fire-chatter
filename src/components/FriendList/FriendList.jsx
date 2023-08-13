import React from 'react'
import './FriendList.scss'
import { fetchMessages, retrieveConversationId } from '../../services/firebase'

function FriendList({ userId, select, friendList, setMessages }) {
  const handleSelectFriend = async (userId, friendId) => {
    select(friendId)
    const conversationId = await retrieveConversationId(userId, friendId)
    const messages = await fetchMessages(conversationId)
    setMessages(messages)
  }

  return (
    <div className="friend-list">
      <ul>
        {friendList.length !== 0 &&
          friendList.map((user, i) => (
            <div key={user.uid}>
              <button onClick={() => handleSelectFriend(userId, user.uid)}>{user?.displayName}</button>
            </div>
          ))}
      </ul>
    </div>
  )
}

export default FriendList
