import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'

import defaultCoverUrl from '../../../assets/cover_default.jpg'
import { COVER_FILTER_ANIM } from '../../../constants/enum'
import CoverFilter from '../CoverFilter/CoverFilter'

function ProfileBackground({ user, coverSize, tabIndex }) {
  const controls = useAnimation()

  /* jiggly effects on switching tabs / users profiles */
  useEffect(() => {
    if (!user.coverUrl) return
    const startAnim = async () => {
      await controls.start(COVER_FILTER_ANIM.hide)
      await controls.start(COVER_FILTER_ANIM.show)
    }
    startAnim()
  }, [user, tabIndex])

  return (
    <motion.div
      animate={controls}
      style={{
        backgroundSize: coverSize,
        backgroundImage: `url(${user.coverUrl || defaultCoverUrl}`
      }}
      className="bg-no-repeat bg-center absolute inset-0 w-screen h-screen md:w-[25vw] md:max-h-[70vh] bg-50 grayscale"
    >
      <CoverFilter />
    </motion.div>
  )
}

export default ProfileBackground
