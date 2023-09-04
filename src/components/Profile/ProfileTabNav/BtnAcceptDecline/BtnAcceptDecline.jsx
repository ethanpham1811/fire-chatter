import React from 'react'
import { FRIENDSHIP_ACTION } from '../../../../constants/enum'
import { handleEnter } from '../../../../utils'
import { AiOutlineCheck, RxCross1 } from '../../../../utils/icons'

function BtnAcceptDecline({ handleSetFriendship }) {
  return (
    <>
      <a
        role="button"
        tabIndex={0}
        onKeyDown={(e) => handleEnter(e)}
        className="accept-label p-2 flex-1 flex justify-center gap-3"
        onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.ACCEPT)}
      >
        <AiOutlineCheck size={20} />
      </a>
      <a
        role="button"
        tabIndex={0}
        onKeyDown={(e) => handleEnter(e)}
        className="reject-label p-2 flex-1 flex justify-center gap-3"
        onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.REMOVE)}
      >
        <RxCross1 size={20} color="insta" />
      </a>
    </>
  )
}

export default BtnAcceptDecline
