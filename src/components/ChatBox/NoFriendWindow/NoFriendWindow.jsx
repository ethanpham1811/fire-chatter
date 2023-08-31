import React from 'react'
import WithCard from '../../../wrappers/WithCard/WithCard'

function NoFriendWindow() {
  return (
    <section
      className={`flex flex-col p-2 overflow-hidden w-screen h-screen md:w-[70vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] md:max-h-[70vh] lg:min-h-[550px] relative`}
    >
      <div className="flex flex-col gap-3 m-auto justify-center items-center">
        <span>connect talents</span> <span>share oppotunities</span> <span>carry out our dreams</span>
        <span>.</span>
        <span>.</span>
      </div>
    </section>
  )
}

export default WithCard(NoFriendWindow)
