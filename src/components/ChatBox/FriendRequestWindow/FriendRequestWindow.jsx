import React, { useContext } from 'react'
import { FRIEND_STATUSES, FRIENDSHIP_ACTION, RIGHT_CARD_MODE } from '../../../constants/enum'
import AppContext from '../../../contexts/AppContext'
import { handleFriendship } from '../../../utils'

function FriendRequestWindow({ user, friend }) {
  const { setSelectedUser, setRightCardMode } = useContext(AppContext)

  /* handle open user detail */
  function handleOpenUserDetail() {
    setSelectedUser(friend)
    setRightCardMode(RIGHT_CARD_MODE.PROFILE)
  }

  /* handle friend requests */
  function handleAcceptFriend() {
    handleFriendship(friend, user, FRIENDSHIP_ACTION.ACCEPT)
  }
  function handleRejectFriend() {
    handleFriendship(friend, user, FRIENDSHIP_ACTION.REMOVE)
  }

  return (
    <>
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
    </>
  )
}

export default FriendRequestWindow
