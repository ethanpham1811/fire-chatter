import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import AppContext from '../../contexts/AppContext'

function WithCard(Component) {
  return function Card(props) {
    const { step, isLoginWrapper, anim } = props
    const baseStyle = `rounded-2xl shadow-card bg-secondary ${isLoginWrapper && 'w-4/5 md:w-2/3 xl:w-1/3'}`
    const { isMobile, mobileStep, isMounted } = useContext(AppContext)
    console.log(anim)

    return (
      <>
        {isMobile ? (
          <div className={isMobile && mobileStep !== step ? 'hidden' : baseStyle}>
            <Component {...props} />
          </div>
        ) : (
          <motion.div
            layout
            variants={!isMounted ? anim.init : anim.main}
            key={anim.key}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={baseStyle}
          >
            <Component {...props} />
          </motion.div>
        )}
      </>
    )
  }
}

export default WithCard
