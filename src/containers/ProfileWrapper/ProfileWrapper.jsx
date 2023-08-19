import React, { useContext, useEffect, useState } from 'react'

import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import polygonBgUrl from '../../assets/profile_cover_bg.png'
import { CoverUploader, ProfileContact, ProfilePhotoUploader, ProfileStatistic } from '../../components'
import { PROFILE_TABS } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import { editUser } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function ProfileWrapper({ user, isMobile, step, isMe = true }) {
  const { setMobileStep } = useContext(AppContext)
  const [tabIndex, setTabIndex] = useState(PROFILE_TABS.CONTACT)
  const [uploadCover, setUploadCover] = useState(null)
  const [uploadPhoto, setUploadPhoto] = useState(null)
  const [bgStyle, setBgStyle] = useState({ background: user.cover || 'url(src/assets/cover.png) no-repeat center / 180%' })
  const polygonStyle = { backgroundImage: `url(${polygonBgUrl})` }

  useEffect(() => {
    uploadPhoto && editUser({ photoUrl: uploadPhoto }, user.uid)
  }, [uploadPhoto])

  useEffect(() => {
    uploadCover && editUser({ coverUrl: uploadCover }, user.uid)
  }, [uploadCover])

  useEffect(() => {
    setBgStyle({ background: `url(src/assets/cover.png) no-repeat center / ${tabIndex === PROFILE_TABS.CONTACT ? '180%' : '100%'}` })
  }, [tabIndex])

  return (
    <section className="flex flex-col p-2 w-screen h-screen md:w-[25vw] md:max-h-[70vh] relative">
      {/* grayscale cover with filter: grayscale(1) */}
      <div style={bgStyle} className="absolute inset-0 ease-in-expo duration-500 w-screen h-screen md:w-[25vw] md:max-h-[70vh] grayscale bg-50" />

      {/* diagonal polygon shape bg  */}
      <div
        style={polygonStyle}
        className={`grow-[${
          tabIndex === PROFILE_TABS.STATISTIC ? '1' : '1.5'
        }] ease-in-expo duration-1000 h-1/3 relative bg-cover bg-no-repeat bg-left-bottom`}
      >
        <CoverUploader setCover={setUploadCover} />
      </div>

      {/* header with logo & name */}
      <header className="relative bg-secondary py-3 px-7">
        <div className=" absolute w-1/3 md:w-1/5 left-7 top-[-70%]">
          <img src={user.photoUrl} alt="User profile photo" className="rounded-full flex-1" />
          {isMe && <ProfilePhotoUploader setProfilePhoto={setUploadPhoto} />}
        </div>
        <h2 className="flex items-center mt-4">
          {user.displayName}
          <span>
            {user.gender ? <TbGenderMale size={20} className="text-genderMale" /> : <TbGenderFemale size={20} className="text-genderFemale" />}
          </span>
        </h2>
        <p className="mt-3 text-xs">@n AI creator, designer, developer.</p>
      </header>

      {/* switch section nav */}
      <Tabs className="flex flex-1 flex-col bg-main shadow-innerChatBox relative" selectedIndex={tabIndex} onSelect={(i) => setTabIndex(i)}>
        <TabList className="flex items-center">
          <Tab tabIndex="-1" className="flex flex-1 p-1 justify-center cursor-pointer outline-none" selectedClassName="bg-darkGray text-white">
            <a className="p-2 flex-1 text-center" href="" onClick={(e) => e.preventDefault()}>
              Contact
            </a>
          </Tab>
          <Tab
            tabIndex="-1"
            className={`flex flex-1 p-1 justify-center cursor-pointer outline-none ${tabIndex === PROFILE_TABS.STATISTIC && 'bg-danger'}`}
            selectedClassName="text-white"
          >
            <a className="p-2 flex-1 text-center" href="" onClick={(e) => e.preventDefault()}>
              {tabIndex === PROFILE_TABS.CONTACT ? 'Interest?' : 'Add Me'}
            </a>
          </Tab>
        </TabList>

        {/* contacts panel */}
        <TabPanel className={`bg-secondary py-5 px-7 flex-1 flex-col ${tabIndex === PROFILE_TABS.CONTACT ? 'flex' : 'hidden'}`}>
          <ProfileContact user={user} />
        </TabPanel>

        {/* profile panel */}
        <TabPanel className={`grow-[0.5] bg-secondary py-5 px-7 flex-col flex-1 text-xs ${tabIndex === PROFILE_TABS.STATISTIC ? 'flex' : 'hidden'}`}>
          <ProfileStatistic user={user} />
        </TabPanel>
      </Tabs>
    </section>
  )
}

export default WithCard(ProfileWrapper)
