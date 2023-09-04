import React, { useContext, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { CARD_TITLE, cardAnimation } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import { editUser } from '../../services/firebase'
import { handleEnter } from '../../utils'
import { PiCaretRightLight } from '../../utils/icons'
import BackArrow from '../BackArrow/BackArrow'
import UserStatusPicker from '../Contacts/UserStatusPicker/UserStatusPicker'
import LogoutModal from '../Modal/LogoutModal'
import Modal from '../Modal/Modal'

function UserNav({ isLoading, hasBack = false, user, isMe = false }) {
  const { setSelectedUser, setSelectedFsId, setActiveCard } = useContext(AppContext)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [statusIsOpened, setStatusIsOpened] = useState(false)

  function handleOpenUserDetail() {
    if (isLoading) return
    // if user is friend (friend object has friendshipId), set selectedFriendshipId
    if (user.friendshipId) setSelectedFsId(user.friendshipId)
    // otherwise remove selectedFsId and set selectedUser (me object has no friendshipId)
    else {
      setSelectedFsId(null)
      setSelectedUser(user)
    }

    setActiveCard(CARD_TITLE.PROFILE)
  }

  function handleOpenStatusPicker(e) {
    e.stopPropagation()
    if (!isMe) return
    setStatusIsOpened(!statusIsOpened)
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        {hasBack && <BackArrow />}
        <div className="flex flex-1 items-center bg-transparent p-0 gap-4">
          <div role="button" className="w-max cursor-pointer" tabIndex={0} onClick={handleOpenUserDetail} onKeyDown={(e) => handleEnter(e)}>
            {isLoading ? (
              <Skeleton circle className="w-[calc(3.5rem_-_3px)] border-x-active rounded-full aspect-square" />
            ) : (
              <img
                style={{
                  borderLeftColor: `var(--${user?.status?.toLowerCase()}-color)`,
                  borderRightColor: `var(--${user?.status?.toLowerCase()}-color)`
                }}
                className="w-14 rounded-full border-solid border-4 object-cover aspect-square"
                src={user?.photoUrl}
                alt="user photo"
              />
            )}
          </div>
          <div className="flex flex-col flex-1 items-start">
            {isLoading ? (
              <>
                <Skeleton width={130} />
                <Skeleton width={120} />
              </>
            ) : (
              <>
                <h3
                  role="button"
                  onClick={handleOpenUserDetail}
                  disabled={isLoading}
                  className="cursor-pointer"
                  tabIndex={0}
                  onKeyDown={(e) => handleEnter(e)}
                >
                  {user?.displayName}
                </h3>
                <span
                  role="button"
                  className={`${isMe ? 'cursor-pointer' : 'cursor-[default]'} text-sm flex items-center gap-2`}
                  tabIndex={0}
                  onClick={handleOpenStatusPicker}
                  onKeyDown={(e) => handleEnter(e)}
                >
                  {user?.status}
                  {isMe && <PiCaretRightLight size={12} className={`${statusIsOpened && 'rotate-90'} transition-all duration-150 ease-in-expo`} />}
                </span>
              </>
            )}
          </div>
        </div>
        {isMe && (
          <>
            <button
              style={{ opacity: isLoading ? 0.5 : 1 }}
              disabled={isLoading}
              className="w-max h-10 flex items-center bg-darkGray text-sm text-white"
              onClick={() => setIsOpenModal(true)}
            >
              Logout
            </button>
            {/* Are you sure to logout modal */}
            <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
              <LogoutModal user={user} setIsOpenModal={setIsOpenModal} anim={cardAnimation.modal} isPopup={true} />
            </Modal>
          </>
        )}
      </div>
      <UserStatusPicker
        isOpened={statusIsOpened}
        activeStatus={user?.status?.toLowerCase()}
        updateRequest={(val) => editUser({ ...user, status: val })}
      />
    </section>
  )
}

export default UserNav
