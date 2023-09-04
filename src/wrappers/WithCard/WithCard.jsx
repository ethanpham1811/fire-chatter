import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import AppContext from '../../contexts/AppContext'

function WithCard(Component) {
  return function Card(props) {
    const { anim } = props
    const baseStyle = `rounded-2xl shadow-card bg-secondary`
    const { isMobile, isMounted } = useContext(AppContext)

    return (
      <>
        {isMobile ? (
          <div className={baseStyle}>
            <Component {...props} />
          </div>
        ) : (
          <motion.div
            layout
            variants={!isMounted ? anim.init : anim.main}
            viewport={{ once: true }}
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
