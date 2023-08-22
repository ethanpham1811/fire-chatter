import { motion } from 'framer-motion'
import React from 'react'

function WithCard(Component) {
  return function Card(props) {
    const { step, isMobile, mobileStep, isLoginWrapper, initVariants, mainVariants, motionKey, isMounted } = props
    const baseStyle = `rounded-2xl shadow-card bg-secondary ${isLoginWrapper && 'w-4/5 md:w-2/3 xl:w-1/3'}`

    return (
      <>
        {!isMounted ? (
          <motion.div
            layout
            variants={initVariants}
            key={motionKey}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={isMobile && mobileStep !== step ? 'hidden' : baseStyle}
          >
            <Component {...props} />
          </motion.div>
        ) : (
          <motion.div
            layout
            variants={mainVariants}
            key={motionKey}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={isMobile && mobileStep !== step ? 'hidden' : baseStyle}
          >
            <Component {...props} />
          </motion.div>
        )}
      </>
    )
  }
}

export default WithCard
