import React, { useContext, useState } from 'react'
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import { CARD_ANIM, MOBILE_STEP } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import { auth } from '../../services/firebase'
import LogoutModal from '../Modal/LogoutModal'
import Modal from '../Modal/Modal'

function UserNav({ hasBack = false, user, hasLogout = true }) {
  const { setMobileStep } = useContext(AppContext)
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <section className="flex gap-4 items-center">
      {hasBack && <HiOutlineArrowSmLeft onClick={() => setMobileStep(MOBILE_STEP.LEFT_CARD)} className="cursor-pointer block md:hidden" size={30} />}
      <div className="w-max">
        <img className="w-14 rounded-full border-x-online border-4" src={user?.photoURL || user?.photoUrl} alt="user avatar" />
      </div>
      <div className="flex flex-col flex-1 justify-center">
        <h3>{user?.displayName}</h3>
        <span className="text-sm">Active now</span>
      </div>
      {hasLogout && (
        <>
          <button className="w-max h-10 flex items-center bg-darkGray text-sm text-white" onClick={() => setIsOpenModal(true)}>
            Logout
          </button>
          {/* Are you sure to logout modal */}
          <Modal isOpen={isOpenModal} setIsOpenModal={setIsOpenModal}>
            <LogoutModal animation={CARD_ANIM.SLIDE_UP} setIsOpenModal={setIsOpenModal} cb={auth.signOut} />
          </Modal>
        </>
      )}
    </section>
  )
}

export default UserNav
