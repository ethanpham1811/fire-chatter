import React from 'react'
import WithCard from '../../wrappers/WithCard/WithCard'

function LogoutModal({ cb, setIsOpenModal }) {
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="text-sm">Are you sure to logout?</div>
      <div className="flex justify-around text-sm">
        <button autoFocus className="p-2 bg-danger text-white" onClick={() => cb()}>
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
