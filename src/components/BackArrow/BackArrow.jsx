import React, { useContext } from 'react'
import { CARD_TITLE } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import { handleEnter } from '../../utils'
import { HiOutlineArrowSmLeft } from '../../utils/icons'

function BackArrow({ styles }) {
  const { setActiveCard } = useContext(AppContext)
  return (
    <span
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleEnter(e)}
      onClick={() => setActiveCard(CARD_TITLE.CONTACTS)}
      className={`${styles} cursor-pointer block lg:hidden`}
    >
      <HiOutlineArrowSmLeft size={30} />
    </span>
  )
}

export default BackArrow
