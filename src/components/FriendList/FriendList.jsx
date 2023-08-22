import React, { useContext } from 'react'
import { MOBILE_STEP, RIGHT_CARD_MODE } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'

function FriendList({ setRightCardMode, selectUser, friendList }) {
  const { setMobileStep } = useContext(AppContext)

  const handleSelectFriend = (user, mode) => {
    selectUser(user)
    setRightCardMode(mode)
    setMobileStep(MOBILE_STEP.RIGHT_CARD)
  }
  return (
    <div className="flex flex-col overflow-y-scroll">
      {friendList.length !== 0 &&
        friendList.map((friend, i) => (
          <div
            className="grid grid-cols-[max-content_1fr_max-content] px-2 py-3 rounded-lg cursor-pointer items-center gap-5 hover:bg-hoverMain border-b-2 border-solid border-main last:border-none after:w-3 after:h-3 after:rounded-full after:bg-online after:ml-auto after:mr-3"
            key={friend.uid}
          >
            <img
              className="rounded-full w-10"
              src={friend.photoUrl}
              alt="user avatar"
              onClick={() => handleSelectFriend(friend, RIGHT_CARD_MODE.PROFILE)}
            />
            <div className="flex flex-col justify-center overflow-hidden" onClick={() => handleSelectFriend(friend, RIGHT_CARD_MODE.CHATBOX)}>
              <h3>{friend?.displayName}</h3>
              <span className="text-sm text-darkGray truncate">
                {"Hey have you heard about the gun shot inccident in Kansas, it's terrible, I'm shocked!"}
              </span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default FriendList
