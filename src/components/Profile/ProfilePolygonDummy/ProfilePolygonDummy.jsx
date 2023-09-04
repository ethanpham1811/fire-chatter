import React from 'react'
import polygonBgUrl from '../../../assets/cover_polygon.png'
import { PROFILE_TABS } from '../../../constants/enum'
import BackArrow from '../../BackArrow/BackArrow'
import CoverUploader from '../CoverUploader/CoverUploader'
import ProfilePhotoUploader from '../ProfilePhotoUploader/ProfilePhotoUploader'

function ProfilePolygonDummy({ user, tabIndex, setUploadCover, setUploadPhoto, isMe }) {
  const polygonStyle = {
    backgroundImage: `url(${polygonBgUrl})`,
    height: tabIndex === PROFILE_TABS.STATISTIC ? '60%' : '33.33%'
  }

  return (
    <div style={polygonStyle} className="z-10 transition-all duration-300 relative bg-no-repeat bg-left-bottom">
      <BackArrow styles="absolute top-3 left-3 z-10" />

      {isMe && <CoverUploader setCover={setUploadCover} />}

      <div className=" absolute w-1/5 left-7 bottom-[-1rem]">
        <img src={user.photoUrl} alt="User profile photo" className="rounded-full flex-1 aspect-square object-cover" />
        {isMe && <ProfilePhotoUploader setProfilePhoto={setUploadPhoto} />}
      </div>
    </div>
  )
}

export default ProfilePolygonDummy
