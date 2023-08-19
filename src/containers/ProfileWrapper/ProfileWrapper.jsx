import React, { useContext, useEffect, useState } from 'react'

import { AiFillTwitterCircle, AiOutlineCamera } from 'react-icons/ai'
import { BsFacebook, BsFillTelephoneFill } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { RiInstagramFill } from 'react-icons/ri'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { PROFILE_TABS } from '../../constants/enum'
import AppContext from '../../contexts/AppContext'
import WithCard from '../../wrappers/WithCard/WithCard'

function ProfileWrapper({ user, isMobile, step, isMe = true }) {
  const { setMobileStep } = useContext(AppContext)
  const [tabIndex, setTabIndex] = useState(PROFILE_TABS.CONTACT)
  const [bgStyle, setBgStyle] = useState({ background: user.cover || 'url(src/assets/cover.png) no-repeat center / 180%' })

  const handleChangeAvatar = () => {
    console.log('change avatar')
  }

  useEffect(() => {
    setBgStyle({ background: `url(src/assets/cover.png) no-repeat center / ${tabIndex === PROFILE_TABS.CONTACT ? '180%' : '100%'}` })
  }, [tabIndex])

  return (
    <section className="flex flex-col p-2 w-screen h-screen md:w-[25vw] md:max-h-[70vh] relative">
      {/* grayscale cover with filter: grayscale(1) */}
      <div style={bgStyle} className="absolute inset-0 ease-in-expo duration-500 w-screen h-screen md:w-[25vw] md:max-h-[70vh] grayscale bg-50" />

      {/* diagonal polygon shape bg  */}
      <div className="bg-cover h-1/3 bg-[url(src/assets/profile_cover_bg.png)] bg-no-repeat bg-left-bottom relative"></div>

      {/* header with logo & name */}
      <header className="relative bg-secondary py-3 px-7">
        <div className=" absolute w-1/3 md:w-1/5 left-7 top-[-70%]">
          <img src={user.photoURL} alt="User profile photo" className="rounded-full flex-1" />
          {isMe && (
            <div className="absolute bottom-0 right-0 p-2 bg-darkGray rounded-full cursor-pointer">
              <AiOutlineCamera onClick={handleChangeAvatar} size={12} color="#fff" />
            </div>
          )}
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
            className={`flex flex-1 p-1 justify-center cursor-pointer outline-none ${tabIndex === PROFILE_TABS.PROF_INFO && 'bg-danger'}`}
            selectedClassName="text-white"
          >
            <a className="p-2 flex-1 text-center" href="" onClick={(e) => e.preventDefault()}>
              {tabIndex === PROFILE_TABS.CONTACT ? 'Interest?' : 'Add Me'}
            </a>
          </Tab>
        </TabList>

        {/* contacts panel */}
        <TabPanel className={`bg-secondary py-5 px-7 flex-1 flex-col ${tabIndex === PROFILE_TABS.CONTACT ? 'flex' : 'hidden'}`}>
          <ul className="flex flex-col gap-5 py-5">
            <li className="flex items-center gap-3">
              <MdEmail size={20} className="text-icon" />
              <span>{user.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <FaLocationDot size={20} className="text-icon" />
              <span>{user.location || 'Ho Chi Minh, Vietnam'}</span>
            </li>
            <li className="flex items-center gap-3">
              <BsFillTelephoneFill size={20} className="text-icon" />
              <span>{user.phone || '(+84) 091-6731-590'}</span>
            </li>
          </ul>
          {/* social medias */}
          <ul className="flex justify-around py-5 w-3/5 m-auto">
            <li>
              <BsFacebook className="cursor-pointer ease-in duration-100 hover:text-fb" size={20} color="fb" />
            </li>
            <li>
              <AiFillTwitterCircle className="cursor-pointer ease-in duration-100 hover:text-twitter" size={20} color="twitter" />
            </li>
            <li>
              <RiInstagramFill className="cursor-pointer ease-in duration-100 hover:text-insta" size={20} color="insta" />
            </li>
          </ul>
        </TabPanel>

        {/* profile panel */}
        <TabPanel className={`bg-secondary py-5 px-7 flex-col flex-1 text-xs ${tabIndex === PROFILE_TABS.PROF_INFO ? 'flex' : 'hidden'}`}>
          <ul className="flex flex-1 w-full">
            <li className="flex flex-1 flex-col justify-center items-center">
              Exp (yrs)<span className="text-3xl">8</span>
            </li>
            <li className="flex flex-1 flex-col justify-center items-center">
              Projects<span className="text-3xl">100+</span>
            </li>
            <li className="flex flex-1 flex-col justify-center items-center">
              Position<span className="text-3xl">Sr.</span>
            </li>
          </ul>
          <ul className="flex flex-1 w-full">
            <li className="flex flex-1 flex-col justify-center items-center">
              Connections<span className="text-3xl">78</span>
            </li>
            <li className="flex flex-1 flex-col justify-center items-center">
              Views<span className="text-3xl">227</span>
            </li>
            <li className="flex flex-1 flex-col justify-center items-center">
              Recs<span className="text-3xl">42</span>
            </li>
          </ul>
        </TabPanel>
      </Tabs>
    </section>
  )
}

export default WithCard(ProfileWrapper)
