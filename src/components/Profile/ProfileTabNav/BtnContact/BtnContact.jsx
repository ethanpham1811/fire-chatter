import React from 'react'
import { PROFILE_TABS } from '../../../../constants/enum'
import { handleEnter } from '../../../../utils'

function BtnContact({ tabIndex }) {
  return (
    <a
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleEnter(e)}
      className={`p-2 flex-1 flex justify-center hover:${tabIndex === PROFILE_TABS.CONTACT ? 'text-white' : 'text-darkGray'}`}
      onClick={(e) => e.preventDefault()}
    >
      Contact
    </a>
  )
}

export default BtnContact
