import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { CARD_TITLE, FRIEND_STATUSES } from '../../../constants/enum'
import AppContext from '../../../contexts/AppContext'

function FriendList({ isLoading, friendList, setSearchTerm }) {
  const { setSelectedFsId, setSelectedUser, setActiveCard } = useContext(AppContext)

  const handleSelectFriend = (e, friend, mode) => {
    e.preventDefault()
    // 2 cases:
    // if user is friend: set friendship ID for subscription (realtime update)
    if (friend.friendshipId) setSelectedFsId(friend.friendshipId)
    // otherwise remove selectedFsId and set selectedUser (stranger has no friendshipId)
    else {
      setSelectedFsId(null)
      setSelectedUser(friend)
    }

    setActiveCard(mode)
    setSearchTerm('')
  }

  const friendListJsx = (
    <>
      {friendList.length !== 0 ? (
        friendList.map((friend, i) => (
          <div
            className={`${
              'after:bg-' + friend.status?.toLowerCase()
            } grid grid-cols-[max-content_1fr_max-content] px-2 py-3 rounded-lg cursor-pointer items-center gap-5 hover:bg-hoverMain border-b-2 border-solid border-main last:border-none after:w-3 after:h-3 after:rounded-full after:ml-auto after:mr-3 ${
              friend.friendStatus !== FRIEND_STATUSES.ACCEPTED && 'after:hidden'
            }`}
            key={friend.uid}
          >
            {/* ----------user photo------------- */}
            <a tabIndex="0" onClick={(e) => handleSelectFriend(e, friend, CARD_TITLE.PROFILE)}>
              <img className="rounded-full w-10 h-10" src={friend.photoUrl} alt="user avatar" />
            </a>

            {/* ------------user name & message--------- */}
            <a
              tabIndex="0"
              className="flex flex-col justify-center overflow-hidden my-[-0.75rem] py-3"
              onClick={(e) => {
                let mode
                if (!friend.friendStatus) mode = CARD_TITLE.PROFILE
                else mode = friend.friendStatus === FRIEND_STATUSES.ACCEPTED ? CARD_TITLE.CHATBOX : CARD_TITLE.FRIEND_REQUEST
                handleSelectFriend(e, friend, mode)
              }}
            >
              <h3>{friend?.displayName}</h3>
              {/* user message */}
              {friend.friendStatus === FRIEND_STATUSES.ACCEPTED && <span className="text-sm text-darkGray truncate">{friend.lastMessage}</span>}
              {friend.friendStatus === FRIEND_STATUSES.PENDING && <span className="text-sm text-danger">Waiting for friend request response</span>}
              {friend.friendStatus === FRIEND_STATUSES.SENT && (
                <span className="text-sm text-danger">{friend.displayName} sent you a friend request</span>
              )}
              {!friend.friendStatus && <span className="text-sm">{friend.location || 'Ho chi minh'}</span>}
            </a>
          </div>
        ))
      ) : (
        <div className="px-2 py-3">You have no added contact</div>
      )}
    </>
  )

  return (
    <div className="flex flex-col overflow-y-auto">
      {isLoading
        ? friendList.map((_, i) => (
            <div className="px-2 py-2.5 flex gap-5" key={`ske${i}`}>
              <Skeleton circle width="2.5rem" className="aspect-square" />
              <div className="flex flex-col flex-1">
                <Skeleton width="100%" />
                <Skeleton width="100%" />
              </div>
            </div>
          ))
        : friendListJsx}
    </div>
  )
}

export default FriendList
