import React, { useContext, useState } from 'react'
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import { CARD_ANIM, MOBILE_STEP } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import LogoutModal from '../Modal/LogoutModal'
import Modal from '../Modal/Modal'

function UserNav({ hasBack = false, user, isMe = true }) {
  const { setMobileStep } = useContext(AppContext)
  const [isOpenModal, setIsOpenModal] = useState(false)

  function handleOpenUserDetail() {
    !isMe && fetchUserDetail(user.uid)
  }

  return (
    <section className="flex gap-4 items-center">
      {hasBack && <HiOutlineArrowSmLeft onClick={() => setMobileStep(MOBILE_STEP.LEFT_CARD)} className="cursor-pointer block md:hidden" size={30} />}
      <button onClick={handleOpenUserDetail} className="flex flex-1 items-center bg-transparent p-0 gap-4">
        <div className="w-max">
          <img className="w-14 rounded-full border-x-online border-4" src={user.photoUrl} alt="user photo" />
        </div>
        <div className="flex flex-col flex-1 items-start">
          <h3>{user?.displayName}</h3>
          <span className="text-sm">Active now</span>
        </div>
      </button>
      {isMe && (
        <>
          <button className="w-max h-10 flex items-center bg-darkGray text-sm text-white" onClick={() => setIsOpenModal(true)}>
            Logout
          </button>
          {/* Are you sure to logout modal */}
          <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
            <LogoutModal setIsOpenModal={setIsOpenModal} animation={CARD_ANIM.SLIDE_UP} />
          </Modal>
        </>
      )}
    </section>
  )
}

export default UserNav
