import React from 'react'
import { auth } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function LogoutModal({ setIsOpenModal }) {
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="text-sm">Are you sure to logout?</div>
      <div className="flex justify-around text-sm">
        <button autoFocus className="p-2 bg-danger text-white" onClick={() => auth.signOut()}>
          Logout
        </button>
        <button className="p-2" onClick={() => setIsOpenModal(false)}>
          Back
        </button>
      </div>
    </div>
  )
}

export default WithCard(LogoutModal)
