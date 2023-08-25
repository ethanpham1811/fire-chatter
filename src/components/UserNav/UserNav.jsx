import React, { useContext, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MOBILE_STEP, RIGHT_CARD_MODE, cardAnimation } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import { HiOutlineArrowSmLeft } from '../../utils/icons'
import LogoutModal from '../Modal/LogoutModal'
import Modal from '../Modal/Modal'

function UserNav({ isLoading, hasBack = false, user, isMe = false }) {
  const { setMobileStep, setSelectedUser, setRightCardMode } = useContext(AppContext)
  const [isOpenModal, setIsOpenModal] = useState(false)

  function handleOpenUserDetail() {
    if (isLoading) return
    setSelectedUser(user)
    setRightCardMode(RIGHT_CARD_MODE.PROFILE)
    setMobileStep(MOBILE_STEP.RIGHT_CARD)
  }

  return (
    <section className="flex gap-4 items-center">
      {hasBack && (
        <HiOutlineArrowSmLeft
          tabIndex="0"
          onClick={() => setMobileStep(MOBILE_STEP.LEFT_CARD)}
          className="cursor-pointer block lg:hidden"
          size={30}
        />
      )}
      <button onClick={handleOpenUserDetail} disabled={isLoading} className="flex flex-1 items-center bg-transparent p-0 gap-4">
        <div className="w-max">
          {isLoading ? (
            <Skeleton circle className="w-[calc(3.5rem_-_3px)] rounded-full aspect-square" />
          ) : (
            <img className="w-14 rounded-full border-x-online border-4 object-cover aspect-square" src={user?.photoUrl} alt="user photo" />
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
              <h3>{user?.displayName}</h3>
              <span className="text-sm">Active now</span>
            </>
          )}
        </div>
      </button>
      {isMe && (
        <>
          <button className="w-max h-10 flex items-center bg-darkGray text-sm text-white" onClick={() => setIsOpenModal(true)}>
            Logout
          </button>
          {/* Are you sure to logout modal */}
          <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
            <LogoutModal setIsOpenModal={setIsOpenModal} anim={cardAnimation.modal} />
          </Modal>
        </>
      )}
    </section>
  )
}

export default UserNav
