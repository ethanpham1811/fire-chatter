import React, { useContext } from 'react'
import { CARD_TITLE, FRIENDSHIP_ACTION, FRIEND_STATUSES } from '../../../constants/enum'
import AppContext from '../../../contexts/AppContext'
import { handleFriendship } from '../../../utils'
import { HiOutlineArrowSmLeft } from '../../../utils/icons'
import WithCard from '../../../wrappers/WithCard/WithCard'

function FriendRequestWindow({ user, friend }) {
  const { setSelectedFsId, setActiveCard } = useContext(AppContext)

  /* handle open user detail */
  function handleOpenUserDetail() {
    setSelectedFsId(friend.friendshipId)
    setActiveCard(CARD_TITLE.PROFILE)
  }

  /* handle friend requests */
  function handleAcceptFriend() {
    handleFriendship(friend, user, FRIENDSHIP_ACTION.ACCEPT)
    setSelectedFsId(friend.friendshipId)
    setActiveCard(CARD_TITLE.CHATBOX)
  }
  function handleRejectFriend() {
    handleFriendship(friend, user, FRIENDSHIP_ACTION.REMOVE)
    setActiveCard(CARD_TITLE.CONTACTS)
  }

  return (
    <section
      className="flex flex-col gap-5 p-5 w-screen h-screen 
                        xs:w-[70vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] 
                        xs:max-h-[70vh] lg:min-h-[550px] relative"
    >
      <div className="flex flex-col gap-3 m-auto justify-center items-center">
        <HiOutlineArrowSmLeft
          tabIndex="0"
          onClick={() => setActiveCard(CARD_TITLE.CONTACTS)}
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
    </section>
  )
}

export default WithCard(FriendRequestWindow)
