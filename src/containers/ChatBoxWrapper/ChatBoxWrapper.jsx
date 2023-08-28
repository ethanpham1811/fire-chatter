import React, { useContext, useEffect, useRef, useState } from 'react'

import { ChatForm, MessageList, UserNav } from '../../components'
import { FRIEND_STATUSES, FRIENSHIP_ACTION, RIGHT_CARD_MODE } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import { useConversationId } from '../../hooks'
import { fetchUserDetail, subscribeToMessages } from '../../services/firebase'
import { handleFrienship } from '../../utils'
import WithCard from '../../wrappers/WithCard/WithCard'

function ChatBoxWrapper({ user, friendId, friendStatus }) {
  const { setSelectedUser, setRightCardMode } = useContext(AppContext)
  const [messages, setMessages] = useState([])
  const [msgIsLoading, setMsgIsLoading] = useState(true)
  const [userIsLoading, setUserIsLoading] = useState(true)
  const [friend, setFriend] = useState(null)
  const [conversationId] = useConversationId(user.uid, friendId)
  const msgListRef = useRef(null)

  /* fetch friend info */
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserDetail(friendId)
      setFriend({ ...data, friendStatus })
      setUserIsLoading(false)
    }
    if (friendId) {
      setMsgIsLoading(true)
      setUserIsLoading(true)
      fetchUser()
    }
  }, [friendId])

  /* messages subscription */
  useEffect(() => {
    const unsubscribe = subscribeToMessages(conversationId, (updatedMsg) => {
      setMessages(updatedMsg)
      setMsgIsLoading(false)
    })
    return () => unsubscribe()
  }, [conversationId])

  /* handle open user detail */
  function handleOpenUserDetail() {
    setSelectedUser(friend)
    setRightCardMode(RIGHT_CARD_MODE.PROFILE)
  }

  /* handle friend requests */
  function handleAcceptFriend() {
    handleFrienship(user, friend, FRIENSHIP_ACTION.ACCEPT)
  }
  function handleRejectFriend() {
    handleFrienship(user, friend, FRIENSHIP_ACTION.REMOVE)
  }

  return (
    <section className="flex flex-col gap-5 p-5 w-screen h-screen md:w-[70vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] md:max-h-[70vh] lg:min-h-[550px]">
      {friend && friend?.friendStatus === FRIEND_STATUSES.ACCEPTED && (
        <>
          <header className="flex items-center">
            <UserNav isLoading={userIsLoading} hasBack={true} user={friend} isMe={false} />
          </header>
          <MessageList
            isLoading={msgIsLoading}
            ref={(ref) => (msgListRef.current = ref)}
            messages={messages}
            userId={user.uid}
            friendPhoto={friend.photoUrl}
          />
          <ChatForm isLoading={msgIsLoading} user={user} friend={friend} conversationId={conversationId} msgListRef={msgListRef} />
        </>
      )}
      {friend && friend?.friendStatus !== FRIEND_STATUSES.ACCEPTED && (
        <div className="flex flex-col gap-3 m-auto justify-center items-center" onClick={handleOpenUserDetail}>
          <button className=" bg-transparent">
            <img className="w-36 rounded-full border-main border-4 object-cover aspect-square" src={friend?.photoUrl} alt="user photo" />
          </button>
          <h2 className="font-semibold">{friend?.displayName}</h2>
          <p className="text-sm flex gap-3">
            {friend?.friendStatus === FRIEND_STATUSES.SENT && 'Please kindly wait for their response.'}
            {friend?.friendStatus === FRIEND_STATUSES.PENDING && (
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
      {!friendId && (
        <div className="flex flex-col gap-3 m-auto justify-center items-center">
          <span>connect talents</span> <span>share oppotunities</span> <span>carry out our dreams</span>
          <span>.</span>
          <span>.</span>
        </div>
      )}
    </section>
  )
}

export default WithCard(ChatBoxWrapper)
