import React from 'react'
import polygonBgUrl from '../../../assets/cover_polygon.png'
import { PROFILE_TABS } from '../../../constants/enum'
import CoverUploader from '../CoverUploader/CoverUploader'

function DiagonalPolygonDummy({ tabIndex, setUploadCover, isMe }) {
  const polygonStyle = { backgroundImage: `url(${polygonBgUrl})` }

  return (
    <div
      style={polygonStyle}
      className={`grow-[${tabIndex === PROFILE_TABS.STATISTIC ? '1' : '1.5'}] ease-in-expo duration-1000 h-1/3 relative bg-no-repeat bg-left-bottom`}
    >
      {isMe && <CoverUploader setCover={setUploadCover} />}
    </div>
  )
}

export default DiagonalPolygonDummy
