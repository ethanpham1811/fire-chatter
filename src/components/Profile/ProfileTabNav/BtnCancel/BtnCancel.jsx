import React from 'react'
import { FRIENDSHIP_ACTION } from '../../../../constants/enum'
import { FcCancel } from '../../../../utils/icons'

function BtnCancel({ handleSetFriendship }) {
  return (
    <a className="cancel-label p-2 flex-1 flex justify-center gap-3" onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.REMOVE)}>
      Cancel
      <FcCancel size={20} color="insta" />
    </a>
  )
}

export default BtnCancel
