import React, { useEffect, useState } from 'react'

import { ProfileBackground, ProfileHeader, ProfilePolygonDummy, ProfileTabNav } from '../../components'
import { useTabAndCoverState, useUploadProfile } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function ProfileWrapper({ user, isMe = false, friendStatus }) {
  // const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState(user.friendStatus)
  const [changingCover, setChangingCover] = useState(false)
  const [setUploadCover, setUploadPhoto] = useUploadProfile(user)
  const [coverSize, tabIndex, setTabIndex] = useTabAndCoverState(user.uid, user.coverUrl)

  /* fetch friend info */
  // useEffect(() => {
  //   setIsLoading(true)
  //   const fetchUser = async () => {
  //     const data = await fetchUserDetail(user.uid)
  //     setProfile(data)
  //     setIsLoading(false)
  //   }
  //   fetchUser()
  // }, [user, friendStatus])

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <section
      className={`flex flex-col p-2 overflow-hidden w-screen h-screen md:w-[70vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] md:max-h-[70vh] lg:min-h-[550px] relative`}
    >
      {/* {isLoading ? (
        <Spinner message="Please wait.." />
      ) : ( */}

      {/* grayscale cover with filter: grayscale(1) */}
      <ProfileBackground changingCover={changingCover} setChangingCover={setChangingCover} user={user} coverSize={coverSize} tabIndex={tabIndex} />
      {/* diagonal polygon shape bg  */}
      <ProfilePolygonDummy isMe={isMe} user={user} tabIndex={tabIndex} setUploadPhoto={setUploadPhoto} setUploadCover={setUploadCover} />
      {/* header with logo & name */}
      <ProfileHeader isMe={isMe} user={user} tabIndex={tabIndex} />
      {/* switch section nav */}
      <ProfileTabNav isMe={isMe} user={user} tabIndex={tabIndex} setChangingCover={setChangingCover} setTabIndex={setTabIndex} />
      {/* </>
      )} */}
    </section>
  )
}

export default WithCard(ProfileWrapper)
