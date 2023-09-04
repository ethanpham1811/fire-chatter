import React, { useContext } from 'react'
import { CARD_TITLE } from '../../../constants/enum'
import AppContext from '../../../contexts/AppContext'
import { HiOutlineArrowSmLeft } from '../../../utils/icons'
import WithCard from '../../../wrappers/WithCard/WithCard'

function NoFriendWindow() {
  const { setActiveCard } = useContext(AppContext)

  return (
    <section
      className="flex flex-col p-2 overflow-hidden w-screen h-screen 
      xs:w-[70vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] 
      xs:max-h-[70vh] lg:min-h-[550px] relative"
    >
      <HiOutlineArrowSmLeft
        tabIndex="0"
        onClick={() => setActiveCard(CARD_TITLE.CONTACTS)}
        className="absolute cursor-pointer block lg:hidden top-3 left-3 z-10"
        size={30}
      />
      <div className="flex flex-col gap-3 m-auto justify-center items-center">
        <span>connect talents</span> <span>share oppotunities</span> <span>carry out our dreams</span>
        <span>.</span>
        <span>.</span>
      </div>
    </section>
  )
}

export default WithCard(NoFriendWindow)
