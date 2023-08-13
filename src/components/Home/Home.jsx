import React, { useState } from 'react'

import FriendList from '../FriendList/FriendList'
import ChatBox from '../ChatBox/ChatBox'
import useUserData from '../../hooks/useUserData'
import './Home.scss'

function Home() {
  const [user, friendList] = useUserData()
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [messages, setMessages] = useState([])

  return (
    <>
      {user ? (
        <div className="home">
          <FriendList userId={user.uid} select={setSelectedFriend} setMessages={setMessages} friendList={friendList} />
          <ChatBox userId={user.uid} friendId={selectedFriend} messages={messages} />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  )
}

export default Home
