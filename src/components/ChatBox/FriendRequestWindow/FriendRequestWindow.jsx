import React, { useContext } from 'react'
import { FRIEND_STATUSES, FRIENDSHIP_ACTION, MOBILE_STEP, RIGHT_CARD_MODE } from '../../../constants/enum'
import AppContext from '../../../contexts/AppContext'
import { handleFriendship } from '../../../utils'
import { HiOutlineArrowSmLeft } from '../../../utils/icons'

function FriendRequestWindow({ user, friend }) {
  const { setSelectedFsId, setRightCardMode, setMobileStep } = useContext(AppContext)

  /* handle open user detail */
  function handleOpenUserDetail() {
    setSelectedFsId(friend.friendshipId)
    setRightCardMode(RIGHT_CARD_MODE.PROFILE)
  }

  /* handle friend requests */
  function handleAcceptFriend() {
    handleFriendship(friend, user, FRIENDSHIP_ACTION.ACCEPT)
    setSelectedFsId(friend.friendshipId)
    setRightCardMode(RIGHT_CARD_MODE.CHATBOX)
  }
  function handleRejectFriend() {
    handleFriendship(friend, user, FRIENDSHIP_ACTION.REMOVE)
    setMobileStep(MOBILE_STEP.LEFT_CARD)
  }

  return (
    <>
      <div className="flex flex-col gap-3 m-auto justify-center items-center">
        <HiOutlineArrowSmLeft
          tabIndex="0"
          onClick={() => setMobileStep(MOBILE_STEP.LEFT_CARD)}
          className="absolute cursor-pointer block lg:hidden top-3 left-3 z-10"
          size={30}
        />
        <button className=" bg-transparent" onClick={handleOpenUserDetail}>
          <img className="w-36 rounded-full border-main border-4 object-cover aspect-square" src={friend?.photoUrl} alt="user photo" />
        </button>
        <h2 className="font-semibold">{friend?.displayName}</h2>
        <p className="text-sm flex gap-3">
          {friend?.friendStatus === FRIEND_STATUSES.PENDING && 'Please kindly wait for their response.'}
          {friend?.friendStatus === FRIEND_STATUSES.SENT && (
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
    </>
  )
}

export default FriendRequestWindow
