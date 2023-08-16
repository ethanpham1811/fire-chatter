import { motion } from 'framer-motion'
import React from 'react'

function WithCard(Component) {
  return (props) => {
    const { card, isMobile, mobileStep, isSignIn, animation } = props
    const baseStyle = `transition-all ease-in duration-300 rounded-2xl shadow-card bg-white backface-hidden opacity-0 ${
      isSignIn && 'w-4/5 md:w-2/3 xl:w-1/3'
    }`
    return (
      <motion.div whileInView={animation} transition={animation.transtion} className={isMobile && mobileStep !== card ? 'hidden' : baseStyle}>
        <Component {...props} />
      </motion.div>
    )
  }
}

export default WithCard
