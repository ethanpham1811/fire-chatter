import React, { useContext } from 'react'
import { FRIEND_STATUSES, MOBILE_STEP, RIGHT_CARD_MODE } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'

function FriendList({ setRightCardMode, selectUser, friendList, setSearchTerm }) {
  const { setMobileStep } = useContext(AppContext)

  const handleSelectFriend = (e, user, mode) => {
    e.preventDefault()
    selectUser(user)
    setRightCardMode(mode)
    setMobileStep(MOBILE_STEP.RIGHT_CARD)
    setSearchTerm('')
  }
  return (
    <div className="flex flex-col overflow-y-scroll">
      {friendList.length !== 0 ? (
        friendList.map((friend, i) => (
          <div
            className={`grid grid-cols-[max-content_1fr_max-content] px-2 py-3 rounded-lg cursor-pointer items-center gap-5 hover:bg-hoverMain border-b-2 border-solid border-main last:border-none after:w-3 after:h-3 after:rounded-full after:bg-online after:ml-auto after:mr-3 ${
              friend.status !== FRIEND_STATUSES.ACCEPTED && 'after:hidden'
            }`}
            key={friend.uid}
          >
            <a href="" tabIndex="0" onClick={(e) => handleSelectFriend(e, friend, RIGHT_CARD_MODE.PROFILE)}>
              <img className="rounded-full w-10" src={friend.photoUrl} alt="user avatar" />
            </a>
            <a
              href=""
              tabIndex="0"
              className="flex flex-col justify-center overflow-hidden"
              onClick={(e) => handleSelectFriend(e, friend, !friend.status ? RIGHT_CARD_MODE.PROFILE : RIGHT_CARD_MODE.CHATBOX)}
            >
              <h3>{friend?.displayName}</h3>
              {friend.status === FRIEND_STATUSES.ACCEPTED && (
                <span className="text-sm text-darkGray truncate">
                  {"Hey have you heard about the gun shot inccident in Kansas, it's terrible, I'm shocked!"}
                </span>
              )}
              {(friend.status === FRIEND_STATUSES.PENDING || friend.status === FRIEND_STATUSES.SENT) && (
                <span className="text-sm text-danger">Waiting for friend request response</span>
              )}
              {!friend.status && <span className="text-sm">{friend.location || 'Ho chi minh'}</span>}
            </a>
          </div>
        ))
      ) : (
        <div className="px-2 py-3">You have no added contact</div>
      )}
    </div>
  )
}

export default FriendList
