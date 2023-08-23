import React, { useContext, useEffect, useState } from 'react'

import { ProfileBackground, ProfileHeader, ProfilePolygonDummy, ProfileTabNav } from '../../components'
import AppContext from '../../contexts/AppContext'
import { useTabAndCoverState, useUploadProfile } from '../../hooks'
import { fetchUserDetail } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function ProfileWrapper({ user, isMobile, step, me, isMe = false, friendStatus }) {
  const { setMobileStep } = useContext(AppContext)
  const [profile, setProfile] = useState(null)
  const [setUploadCover, setUploadPhoto] = useUploadProfile(user)
  const [coverSize, tabIndex, setTabIndex] = useTabAndCoverState(user.uid, user.coverUrl)

  /* fetch friend info */
  useEffect(() => {
    console.log(user, friendStatus)
    const fetchUser = async () => {
      const data = await fetchUserDetail(user.uid)
      setProfile({ ...data, status: friendStatus })
    }
    user && fetchUser()
  }, [user, friendStatus])

  return (
    <>
      {profile && (
        <section className="flex flex-col p-2 w-screen h-screen md:w-[25vw] md:max-h-[70vh] relative bg-[#d3d3d3]">
          {/* grayscale cover with filter: grayscale(1) */}
          <ProfileBackground user={profile} coverSize={coverSize} tabIndex={tabIndex} />
          {/* diagonal polygon shape bg  */}
          <ProfilePolygonDummy setUploadCover={setUploadCover} tabIndex={tabIndex} isMe={isMe} />
          {/* header with logo & name */}
          <ProfileHeader isMe={isMe} user={profile} setUploadPhoto={setUploadPhoto} />
          {/* switch section nav */}
          <ProfileTabNav user={profile} me={me} isMe={isMe} setTabIndex={setTabIndex} tabIndex={tabIndex} />
        </section>
      )}
    </>
  )
}

export default WithCard(ProfileWrapper)
