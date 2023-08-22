import React, { useContext } from 'react'

import { ProfileBackground, ProfileHeader, ProfilePolygonDummy, ProfileTabNav } from '../../components'
import AppContext from '../../contexts/AppContext'
import { useTabAndCoverState, useUploadProfile } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function ProfileWrapper({ user, isMobile, step, myId, isMe = false }) {
  const { setMobileStep } = useContext(AppContext)
  const [setUploadCover, setUploadPhoto] = useUploadProfile(user)
  const [coverSize, tabIndex, setTabIndex] = useTabAndCoverState(user.uid, user.coverUrl)

  return (
    <section className="flex flex-col p-2 w-screen h-screen md:w-[25vw] md:max-h-[70vh] relative bg-[#d3d3d3]">
      {/* grayscale cover with filter: grayscale(1) */}
      <ProfileBackground user={user} coverSize={coverSize} tabIndex={tabIndex} />

      {/* diagonal polygon shape bg  */}
      <ProfilePolygonDummy setUploadCover={setUploadCover} tabIndex={tabIndex} isMe={isMe} />

      {/* header with logo & name */}
      <ProfileHeader isMe={isMe} user={user} setUploadPhoto={setUploadPhoto} />

      {/* switch section nav */}
      <ProfileTabNav user={user} myId={myId} isMe={isMe} setTabIndex={setTabIndex} tabIndex={tabIndex} />
    </section>
  )
}

export default WithCard(ProfileWrapper)
