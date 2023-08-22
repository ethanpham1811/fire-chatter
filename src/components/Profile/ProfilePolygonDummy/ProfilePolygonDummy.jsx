import React from 'react'
import polygonBgUrl from '../../../assets/cover_polygon.png'
import { PROFILE_TABS } from '../../../constants/enum'
import CoverUploader from '../CoverUploader/CoverUploader'

function ProfilePolygonDummy({ tabIndex, setUploadCover, isMe }) {
  const polygonStyle = {
    backgroundImage: `url(${polygonBgUrl})`,
    height: tabIndex === PROFILE_TABS.STATISTIC ? '50%' : '33.33%'
  }

  return (
    <div style={polygonStyle} className="transition-all duration-300 relative bg-no-repeat bg-left-bottom">
      {isMe && <CoverUploader setCover={setUploadCover} />}
    </div>
  )
}

export default ProfilePolygonDummy
