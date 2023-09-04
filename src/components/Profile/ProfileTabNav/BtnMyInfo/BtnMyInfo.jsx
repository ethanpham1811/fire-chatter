import React from 'react'
import { PROFILE_TABS } from '../../../../constants/enum'
import { handleEnter } from '../../../../utils'

function BtnMyInfo({ tabIndex }) {
  return (
    <a
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleEnter(e)}
      className={`my-info-label p-2 flex-1 flex justify-center hover:${tabIndex === PROFILE_TABS.STATISTIC ? 'text-white' : 'text-darkGray'}`}
      onClick={(e) => e.preventDefault()}
    >
      My Info
    </a>
  )
}

export default BtnMyInfo
