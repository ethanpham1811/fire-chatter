import React, { useContext } from 'react'
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import { auth } from '../../services/firebase'
import { MOBILE_MODE } from '../../constants/enum'
import { MobileContext } from '../../contexts/MobileContext'

function UserNav({ hasBack = false, user, hasLogout = true }) {
  const { setMobileMode } = useContext(MobileContext)
  return (
    <section className="flex gap-4 items-center">
      {hasBack && (
        <HiOutlineArrowSmLeft onClick={() => setMobileMode(MOBILE_MODE.FRIEND_LIST)} className="cursor-pointer hidden md:block" size={30} />
      )}
      <div className="w-max">
        <img className="w-14 rounded-full border-x-lime-500 border-4" src={user?.photoURL || user?.photoUrl} alt="user avatar" />
      </div>
      <div className="flex flex-col flex-1 justify-center">
        <h3 className="font-bold">{user?.displayName}</h3>
        <span>Active now</span>
      </div>
      {hasLogout && (
        <button className="w-max h-10 flex items-center bg-darkGray text-white" onClick={() => auth.signOut()}>
          Logout
        </button>
      )}
    </section>
  )
}

export default UserNav
