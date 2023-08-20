import React, { useContext } from 'react'

import { DiagonalPolygonDummy, ProfileBackground, ProfileHeader, TabNav } from '../../components'
import AppContext from '../../contexts/AppContext'
import { useTabAndCoverState, useUploadProfile } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function ProfileWrapper({ user, isMobile, step, isMe = false }) {
  const { setMobileStep } = useContext(AppContext)
  const [setUploadCover, setUploadPhoto] = useUploadProfile(user)
  const [coverSize, tabIndex, setTabIndex] = useTabAndCoverState(user)

  return (
    <section className="flex flex-col p-2 w-screen h-screen md:w-[25vw] md:max-h-[70vh] relative">
      {/* grayscale cover with filter: grayscale(1) */}
      <ProfileBackground user={user} coverSize={coverSize} />

      {/* diagonal polygon shape bg  */}
      <DiagonalPolygonDummy setUploadCover={setUploadCover} tabIndex={tabIndex} isMe={isMe} />

      {/* header with logo & name */}
      <ProfileHeader isMe={isMe} user={user} setUploadPhoto={setUploadPhoto} />

      {/* switch section nav */}
      <TabNav user={user} isMe={isMe} setTabIndex={setTabIndex} tabIndex={tabIndex} />
    </section>
  )
}

export default WithCard(ProfileWrapper)
