import { motion } from 'framer-motion'
import React from 'react'
import { v4 as rid } from 'uuid'
import { friendBtnAnimation } from '../../../../constants/enum'
import { handleEnter } from '../../../../utils'
import { FaUserCheck } from '../../../../utils/icons'

function BtnFriend({ toggleUnfriendBtn }) {
  return (
    <a
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleEnter(e)}
      className="friend-label p-2 flex-1 flex justify-center gap-3"
      onClick={toggleUnfriendBtn}
    >
      <motion.span layout variants={friendBtnAnimation.animation} key={`friend_btn_${rid()}`} initial="hidden" animate="visible" exit="exit">
        Friends
      </motion.span>
      <FaUserCheck size={20} />
    </a>
  )
}

export default BtnFriend
