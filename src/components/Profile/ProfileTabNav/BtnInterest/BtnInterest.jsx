import React from 'react'
import { handleEnter } from '../../../../utils'

function BtnInterest() {
  return (
    <a
      role="button"
      tabIndex={0}
      onKeyDown={(e) => handleEnter(e)}
      className="interest-label p-2 flex-1 flex justify-center gap-3 hover:text-darkGray"
      onClick={(e) => e.preventDefault()}
    >
      Interest?
    </a>
  )
}

export default BtnInterest
