import React, { useContext } from 'react'
import { MOBILE_MODE } from '../../constants/enum'
import { MobileContext } from '../../contexts/MobileContext'

function FriendList({ select, friendList }) {
  const { setMobileMode } = useContext(MobileContext)

  const handleSelectFriend = (friend) => {
    select(friend)
    setMobileMode(MOBILE_MODE.CHAT_BOX)
  }

  return (
    <div className="flex flex-col gap-1 overflow-y-scroll">
      {friendList.length !== 0 &&
        friendList.map((friend, i) => (
          <div
            className="flex p-2 rounded-lg cursor-pointer items-center gap-5 border-none hover:bg-slate-200"
            key={friend.uid}
            onClick={() => handleSelectFriend(friend)}
          >
            <img className="rounded-full w-10" src={friend.photoUrl} alt="user avatar" />
            {friend?.displayName}
          </div>
        ))}
    </div>
  )
}

export default FriendList
