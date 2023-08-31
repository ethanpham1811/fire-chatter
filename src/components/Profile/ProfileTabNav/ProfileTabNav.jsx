import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { ProfileContact, ProfileStatistic } from '../../'
import { FRIENDSHIP_ACTION, FRIEND_STATUSES, MOBILE_STEP, PROFILE_TABS, PROFILE_TAB_ANIM } from '../../../constants/enum'
import AppContext from '../../../contexts/AppContext'
import { handleFriendship } from '../../../utils'
import { AiOutlineCheck, AiOutlineUserAdd, FaUserCheck, FcCancel, RxCross1 } from '../../../utils/icons'
import './ProfileTabNav.css'

function ProfileTabNav({ user, isMe, setTabIndex, tabIndex, setChangingCover }) {
  const { me, setMobileStep } = useContext(AppContext)
  const [isUnfriendBtn, setIsUnfriendBtn] = useState(false)

  const handleSwitchTab = (i) => {
    setTabIndex(i)
    setChangingCover(true)
  }
  const toggleUnfriendBtn = () => {
    setIsUnfriendBtn(!isUnfriendBtn)
  }
  const handleSetFriendship = (e, action) => {
    e.preventDefault()
    handleFriendship(me, user, action)
    // on mobile: navigate user to left card on request declining/remove request
    action === FRIENDSHIP_ACTION.REMOVE && setMobileStep(MOBILE_STEP.LEFT_CARD)
  }

  return (
    <Tabs className="flex flex-1 flex-col transition-all bg-main shadow-innerChatBox relative" selectedIndex={tabIndex} onSelect={handleSwitchTab}>
      <TabList className="flex items-center z-10">
        <Tab
          tabIndex="-1"
          className="flex flex-1 justify-center cursor-pointer outline-none"
          selectedClassName="profile-nav-tab__contact-btn--active"
        >
          <a
            className={`p-2 flex-1 flex justify-center hover:${tabIndex === PROFILE_TABS.CONTACT ? 'text-white' : 'text-darkGray'}`}
            href=""
            onClick={(e) => e.preventDefault()}
          >
            Contact
          </a>
        </Tab>
        <Tab
          tabIndex="-1"
          className="flex flex-1 justify-center cursor-pointer outline-none"
          selectedClassName="profile-nav-tab__statistic-btn--active"
        >
          {isMe && (
            <a
              className={`my-info-label p-2 flex-1 flex justify-center hover:${tabIndex === PROFILE_TABS.STATISTIC ? 'text-white' : 'text-darkGray'}`}
              href=""
              onClick={(e) => e.preventDefault()}
            >
              My Info
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.CONTACT && (
            <a
              className={`interest-label p-2 flex-1 flex justify-center gap-3 hover:${
                tabIndex === PROFILE_TABS.STATISTIC ? 'text-white' : 'text-darkGray'
              }`}
              href=""
              onClick={(e) => e.preventDefault()}
            >
              {tabIndex === PROFILE_TABS.CONTACT && 'Interest?'}
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && !user?.friendStatus && (
            <a
              className="add-me-label p-2 flex-1 flex justify-center gap-3"
              href=""
              onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.REQUEST)}
            >
              Add Me
              <AiOutlineUserAdd size={20} />
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && user?.friendStatus === FRIEND_STATUSES.PENDING && (
            <a
              className="cancel-label p-2 flex-1 flex justify-center gap-3"
              href=""
              onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.REMOVE)}
            >
              Cancel
              <FcCancel size={20} color="insta" />
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && user?.friendStatus === FRIEND_STATUSES.SENT && (
            <>
              <a
                className="accept-label p-2 flex-1 flex justify-center gap-3"
                href=""
                onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.ACCEPT)}
              >
                <AiOutlineCheck size={20} />
              </a>
              <a
                className="reject-label p-2 flex-1 flex justify-center gap-3"
                href=""
                onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.REMOVE)}
              >
                <RxCross1 size={20} color="insta" />
              </a>
            </>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && user?.friendStatus === FRIEND_STATUSES.ACCEPTED && !isUnfriendBtn && (
            <a className="friend-label p-2 flex-1 flex justify-center gap-3" href="" onMouseEnter={toggleUnfriendBtn}>
              Friends
              <FaUserCheck size={20} />
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && user?.friendStatus === FRIEND_STATUSES.ACCEPTED && isUnfriendBtn && (
            <a
              className="unfriend-label p-2 flex-1 flex justify-center gap-3"
              href=""
              onClick={(e) => handleSetFriendship(e, FRIENDSHIP_ACTION.REMOVE)}
              onMouseLeave={toggleUnfriendBtn}
            >
              Unfriend
              <FcCancel size={20} color="insta" />
            </a>
          )}
        </Tab>
      </TabList>

      {/* contacts panel */}
      <TabPanel className={`bg-secondary py-5 px-7 flex-1 flex-col ${tabIndex === PROFILE_TABS.CONTACT ? 'flex' : 'hidden'}`}>
        <motion.div layout variants={PROFILE_TAB_ANIM} key="profile-tab-contact" initial="hidden" animate="visible" className="flex flex-col flex-1">
          {tabIndex === PROFILE_TABS.CONTACT && <ProfileContact isMe={isMe} user={user} />}
        </motion.div>
      </TabPanel>

      {/* profile panel */}
      <TabPanel className={`bg-secondary py-5 px-7 flex-1 flex-col ${tabIndex === PROFILE_TABS.STATISTIC ? 'flex' : 'hidden'} text-xs`}>
        <motion.div
          layout
          variants={PROFILE_TAB_ANIM}
          key="profile-tab-statistic"
          initial="hidden"
          animate="visible"
          className="flex flex-col flex-1"
        >
          {tabIndex === PROFILE_TABS.STATISTIC && <ProfileStatistic isMe={isMe} user={user} />}
        </motion.div>
      </TabPanel>
    </Tabs>
  )
}

export default ProfileTabNav
