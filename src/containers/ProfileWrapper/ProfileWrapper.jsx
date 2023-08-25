import React, { useEffect, useState } from 'react'

import { ProfileBackground, ProfileHeader, ProfilePolygonDummy, ProfileTabNav, Spinner } from '../../components'
import { useTabAndCoverState, useUploadProfile } from '../../hooks'
import { fetchUserDetail } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function ProfileWrapper({ user, isMobile, step, me, isMe = false, friendStatus }) {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [setUploadCover, setUploadPhoto] = useUploadProfile(user)
  const [coverSize, tabIndex, setTabIndex] = useTabAndCoverState(user.uid, user.coverUrl)

  /* fetch friend info */
  useEffect(() => {
    setIsLoading(true)
    const fetchUser = async () => {
      const data = await fetchUserDetail(user.uid)
      setProfile({ ...data, status: friendStatus })
      setIsLoading(false)
    }
    if (isMe) {
      setProfile(me)
      setIsLoading(false)
    } else fetchUser()
  }, [user, friendStatus])

  return (
    <section
      className={`flex flex-col p-2 overflow-hidden w-screen h-screen md:w-[70vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] md:max-h-[70vh] lg:min-h-[550px] relative bg-[${
        isLoading ? 'white' : '#d3d3d3'
      }]`}
    >
      {isLoading ? (
        <Spinner message="Please wait.." />
      ) : (
        <>
          {/* grayscale cover with filter: grayscale(1) */}
          <ProfileBackground user={profile} coverSize={coverSize} tabIndex={tabIndex} />
          {/* diagonal polygon shape bg  */}
          <ProfilePolygonDummy user={profile} setUploadPhoto={setUploadPhoto} setUploadCover={setUploadCover} tabIndex={tabIndex} isMe={isMe} />
          {/* header with logo & name */}
          <ProfileHeader isMe={isMe} user={profile} tabIndex={tabIndex} />
          {/* switch section nav */}
          <ProfileTabNav user={profile} me={me} isMe={isMe} setTabIndex={setTabIndex} tabIndex={tabIndex} />
        </>
      )}
    </section>
  )
}

export default WithCard(ProfileWrapper)
