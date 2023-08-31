import React, { useContext } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FRIEND_STATUSES, MOBILE_STEP, RIGHT_CARD_MODE } from '../../../constants/enum'
import AppContext from '../../../contexts/AppContext'

function FriendList({ isLoading, friendList, setSearchTerm }) {
  const { setMobileStep, setSelectedUser, setRightCardMode } = useContext(AppContext)

  const handleSelectFriend = (e, user, mode) => {
    e.preventDefault()
    setSelectedUser(user)
    setRightCardMode(mode)
    setMobileStep(MOBILE_STEP.RIGHT_CARD)
    setSearchTerm('')
  }

  const friendListJsx = (
    <>
      {friendList.length !== 0 ? (
        friendList.map((friend, i) => (
          <div
            className={`${
              'after:bg-' + friend.status
            } grid grid-cols-[max-content_1fr_max-content] px-2 py-3 rounded-lg cursor-pointer items-center gap-5 hover:bg-hoverMain border-b-2 border-solid border-main last:border-none after:w-3 after:h-3 after:rounded-full after:ml-auto after:mr-3 ${
              friend.friendStatus !== FRIEND_STATUSES.ACCEPTED && 'after:hidden'
            }`}
            key={friend.uid}
          >
            <a href="" tabIndex="0" onClick={(e) => handleSelectFriend(e, friend, RIGHT_CARD_MODE.PROFILE)}>
              <img className="rounded-full w-10" src={friend.photoUrl} alt="user avatar" />
            </a>
            <a
              href=""
              tabIndex="0"
              className="flex flex-col justify-center overflow-hidden my-[-0.75rem] py-3"
              onClick={(e) => handleSelectFriend(e, friend, !friend.friendStatus ? RIGHT_CARD_MODE.PROFILE : RIGHT_CARD_MODE.CHATBOX)}
            >
              <h3>{friend?.displayName}</h3>
              {friend.friendStatus === FRIEND_STATUSES.ACCEPTED && (
                <span className="text-sm text-darkGray truncate">
                  {"Hey have you heard about the gun shot inccident in Kansas, it's terrible, I'm shocked!"}
                </span>
              )}
              {friend.friendStatus === FRIEND_STATUSES.PENDING && <span className="text-sm text-danger">Waiting for friend request response</span>}
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
