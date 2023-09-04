import { motion } from 'framer-motion'
import React from 'react'
import { v4 as rid } from 'uuid'
import { FRIENDSHIP_ACTION, unfriendBtnAnimation } from '../../../../constants/enum'
import { FcCancel } from '../../../../utils/icons'

function BtnUnfriend({ toggleUnfriendBtn, handleSetFriendship }) {
  return (
    <a
      className="unfriend-label p-2 flex-1 flex justify-center gap-3"
      onMouseLeave={toggleUnfriendBtn}
      onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.REMOVE)}
    >
      <motion.span variants={unfriendBtnAnimation.animation} key={`unfriend_btn_${rid()}`} initial="hidden" animate="visible" exit="exit">
        Unfriend
      </motion.span>
      <FcCancel size={20} color="insta" />
    </a>
  )
}

export default BtnUnfriend
