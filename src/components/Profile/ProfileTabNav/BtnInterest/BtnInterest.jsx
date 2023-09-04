import React from 'react'

function BtnInterest() {
  return (
    <a className="interest-label p-2 flex-1 flex justify-center gap-3 hover:text-darkGray" onClick={(e) => e.preventDefault()}>
      Interest?
    </a>
  )
}

export default BtnInterest
