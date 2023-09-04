import React from 'react'
import { PROFILE_TABS } from '../../../../constants/enum'

function BtnContact({ tabIndex }) {
  return (
    <a
      className={`p-2 flex-1 flex justify-center hover:${tabIndex === PROFILE_TABS.CONTACT ? 'text-white' : 'text-darkGray'}`}
      onClick={(e) => e.preventDefault()}
    >
      Contact
    </a>
  )
}

export default BtnContact
