import { motion, useAnimation } from 'framer-motion'
import React, { useEffect } from 'react'

import defaultCoverUrl from '../../../assets/cover_default.jpg'
import { COVER_FILTER_ANIM, PROFILE_TABS } from '../../../constants/enum'
import CoverFilter from '../CoverFilter/CoverFilter'

function ProfileBackground({ hasBack, user, coverSize, tabIndex }) {
  const controls = useAnimation()

  /* jiggly effects on switching tabs / users profiles */
  useEffect(() => {
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
      className={`${tabIndex === PROFILE_TABS.STATISTIC && 'bg-top'} bg-center absolute inset-0 grayscale`}
    >
      <CoverFilter />
    </motion.div>
  )
}

export default ProfileBackground
