import React, { useEffect, useRef, useState } from 'react'

import { ChatForm, MessageList, UserNav } from '../../components'
import { FRIEND_STATUSES, RIGHT_CARD_MODE } from '../../constants/enum'
import { useConversationId } from '../../hooks'
import { fetchUserDetail, removeFriend, setFriendship, subscribeToMessages } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function ChatBoxWrapper({ user, friendId, friendStatus, setRightCardMode, selectUser }) {
  const [messages, setMessages] = useState([])
  const [friend, setFriend] = useState(null)
  const [conversationId] = useConversationId(user.uid, friendId)
  const msgListRef = useRef(null)

  /* fetch friend info */
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserDetail(friendId)
      setFriend({ ...data, status: friendStatus })
    }
    friendId && fetchUser()
  }, [friendId])

  /* messages subscription */
  useEffect(() => {
    const unsubscribe = subscribeToMessages(conversationId, (updatedMsg) => setMessages(updatedMsg))
    return () => unsubscribe()
  }, [conversationId])

  /* handle open user detail */
  function handleOpenUserDetail() {
    selectUser(friend)
    setRightCardMode(RIGHT_CARD_MODE.PROFILE)
  }

  /* handle friend requests */
  function handleAcceptFriend() {
    console.log('here')
    setFriendship(friend, user.uid, FRIEND_STATUSES.ACCEPTED)
    setFriendship(user, friend.uid, FRIEND_STATUSES.ACCEPTED)
  }
  function handleRejectFriend() {
    removeFriend(friend.uid, user.uid)
    removeFriend(user.uid, friend.uid)
  }

  return (
    <section className="flex flex-col gap-5 p-5 w-screen h-screen md:w-[25vw] md:max-h-[70vh]">
      {friend && friend.status === FRIEND_STATUSES.ACCEPTED && (
        <>
          <header className="flex items-center">
            <UserNav setRightCardMode={setRightCardMode} selectUser={selectUser} hasBack={true} user={friend} isMe={false} />
          </header>
          <MessageList ref={(ref) => (msgListRef.current = ref)} messages={messages} userId={user.uid} />
          <ChatForm user={user} friend={friend} conversationId={conversationId} msgListRef={msgListRef} />
        </>
      )}
      {friend && friend.status !== FRIEND_STATUSES.ACCEPTED && (
        <div className="flex flex-col gap-3 m-auto justify-center items-center" onClick={handleOpenUserDetail}>
          <button className=" bg-transparent">
            <img className="w-36 rounded-full border-main border-4 object-cover aspect-square" src={friend?.photoUrl} alt="user photo" />
          </button>
          <h2 className="font-semibold">{friend?.displayName}</h2>
          <p className="text-sm flex gap-3">
            {friend?.status === FRIEND_STATUSES.SENT && 'Please kindly wait for their response.'}
            {friend?.status === FRIEND_STATUSES.PENDING && (
              <>
                <button className="bg-darkGray text-white w-28" onClick={handleAcceptFriend}>
                  Accept
                </button>
                <button className="bg-main w-28" onClick={handleRejectFriend}>
                  Reject
                </button>
              </>
            )}
          </p>
        </div>
      )}
      {!friend && (
        <div className="flex flex-col gap-3 m-auto justify-center items-center">
          <span>Search for people</span> <span>add new friends</span> <span>then start a chat!</span>
          <span>.</span>
          <span>.</span>
        </div>
      )}
    </section>
  )
}

export default WithCard(ChatBoxWrapper)
