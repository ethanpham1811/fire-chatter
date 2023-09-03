import React from 'react'
import { FRIENDSHIP_ACTION } from '../../../../constants/enum'
import { AiOutlineUserAdd } from '../../../../utils/icons'

function BtnAdd({ handleSetFriendship }) {
  return (
    <a className="add-me-label p-2 flex-1 flex justify-center gap-3" onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.REQUEST)}>
      Add Me
      <AiOutlineUserAdd size={20} />
    </a>
  )
}

export default BtnAdd
