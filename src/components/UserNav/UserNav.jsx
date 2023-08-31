import React, { useContext, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MOBILE_STEP, RIGHT_CARD_MODE, cardAnimation } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import { editUser } from '../../services/firebase'
import { HiOutlineArrowSmLeft, PiCaretRightLight } from '../../utils/icons'
import UserStatusPicker from '../Contacts/UserStatusPicker/UserStatusPicker'
import LogoutModal from '../Modal/LogoutModal'
import Modal from '../Modal/Modal'

function UserNav({ isLoading, hasBack = false, user, isMe = false }) {
  const { setMobileStep, setSelectedUser, setRightCardMode } = useContext(AppContext)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [statusIsOpened, setStatusIsOpened] = useState(false)

  function handleOpenUserDetail() {
    if (isLoading) return
    setSelectedUser(user)
    setRightCardMode(RIGHT_CARD_MODE.PROFILE)
    setMobileStep(MOBILE_STEP.RIGHT_CARD)
  }

  function handleChangeStatus(e) {
    e.stopPropagation()
    if (!isMe) return
    setStatusIsOpened(!statusIsOpened)
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        {hasBack && (
          <HiOutlineArrowSmLeft
            tabIndex="0"
            onClick={() => setMobileStep(MOBILE_STEP.LEFT_CARD)}
            className="cursor-pointer block lg:hidden"
            size={30}
          />
        )}
        <div className="flex flex-1 items-center bg-transparent p-0 gap-4">
          <div className="w-max cursor-pointer" tabIndex={0} onClick={handleOpenUserDetail}>
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
                <h3 onClick={handleOpenUserDetail} disabled={isLoading} className="cursor-pointer">
                  {user?.displayName}
                </h3>
                <span className={`${isMe ? 'cursor-pointer' : 'cursor-[default]'} text-sm flex items-center gap-2`} onClick={handleChangeStatus}>
                  {user?.status}
                  {isMe && <PiCaretRightLight size={12} className={`${statusIsOpened && 'rotate-90'} transition-all duration-150 ease-in-expo`} />}
                </span>
              </>
            )}
          </div>
        </div>
        {isMe && (
          <>
            <button className="w-max h-10 flex items-center bg-darkGray text-sm text-white" onClick={() => setIsOpenModal(true)}>
              Logout
            </button>
            {/* Are you sure to logout modal */}
            <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
              <LogoutModal setIsOpenModal={setIsOpenModal} anim={cardAnimation.modal} isPopup={true} />
            </Modal>
          </>
        )}
      </div>
      <UserStatusPicker
        isOpened={statusIsOpened}
        activeStatus={user?.status?.toLowerCase()}
        updateRequest={(val) => editUser({ ...user, status: val }, user?.uid)}
      />
    </section>
  )
}

export default UserNav
