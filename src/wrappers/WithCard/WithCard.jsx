import { motion } from 'framer-motion'
import React from 'react'
import { NO_ANIM } from '../../constants/enum'

function WithCard(Component) {
  return (props) => {
    const { step, isMobile, mobileStep, isSignIn, animation } = props
    const baseStyle = `transition-all ease-in duration-300 rounded-2xl shadow-card bg-white backface-hidden opacity-0 ${
      isSignIn && 'w-4/5 md:w-2/3 xl:w-1/3'
    }`
    return (
      <motion.div
        whileInView={isMobile ? NO_ANIM : animation}
        transition={animation.transition}
        className={isMobile && mobileStep !== step ? 'hidden' : baseStyle}
      >
        <Component {...props} />
      </motion.div>
    )
  }
}

export default WithCard
