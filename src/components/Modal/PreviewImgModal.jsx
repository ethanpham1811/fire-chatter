import React from 'react'
import WithCard from '../../wrappers/WithCard/WithCard'

function PreviewImgModal({ img }) {
  return (
    <div className="p-5 flex flex-col gap-5 relative">
      <img src={img} alt="preview image" className="max-h-[90vh]" />
    </div>
  )
}

export default WithCard(PreviewImgModal)
