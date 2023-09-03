import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { ProfileContact, ProfileStatistic } from '../../'
import { BtnAcceptDecline, BtnAdd, BtnCancel, BtnContact, BtnFriend, BtnInterest, BtnMyInfo, BtnUnfriend } from '../../../components'
import { FRIENDSHIP_ACTION, FRIEND_STATUSES, PROFILE_TABS, PROFILE_TAB_ANIM } from '../../../constants/enum'
import AppContext from '../../../contexts/AppContext'
import { handleFriendship } from '../../../utils'
import './ProfileTabNav.css'

function ProfileTabNav({ user, isMe, setTabIndex, tabIndex, setChangingCover }) {
  const { me, setMobileStep, setSelectedUser } = useContext(AppContext)
  const [isUnfriendBtn, setIsUnfriendBtn] = useState(false)
  const [fsStatus, setFsStatus] = useState(null)

  const handleSwitchTab = (i) => {
    setTabIndex(i)
    setChangingCover(true)
  }
  const toggleUnfriendBtn = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsUnfriendBtn(!isUnfriendBtn)
  }
  const handleSetFriendship = (e, action) => {
    e.preventDefault()
    setFsStatus(action)
    action === FRIENDSHIP_ACTION.ACCEPT ? handleFriendship(user, me, action) : handleFriendship(me, user, action)
    // on mobile: navigate user to left card on request declining/remove request
    // if (action === FRIENDSHIP_ACTION.REMOVE) {
    //   setSelectedUser(null)
    //   setMobileStep(MOBILE_STEP.LEFT_CARD)
    // }
  }

  return (
    <Tabs className="flex flex-1 flex-col transition-all bg-main shadow-innerChatBox relative" selectedIndex={tabIndex} onSelect={handleSwitchTab}>
      <TabList className="flex items-center z-10">
        {/* Contact tab */}
        <Tab
          tabIndex="-1"
          className="flex flex-1 justify-center cursor-pointer outline-none"
          selectedClassName="profile-nav-tab__contact-btn--active"
        >
          <BtnContact tabIndex={tabIndex} />
        </Tab>

        {/* Statistic tab */}
        <Tab
          tabIndex="-1"
          className="flex flex-1 justify-center cursor-pointer outline-none"
          selectedClassName="profile-nav-tab__statistic-btn--active"
        >
          {/* if the user is me */}
          {isMe && <BtnMyInfo tabIndex={tabIndex} />}

          {/* if the user is not me */}
          {!isMe && (
            <>
              {/* if Contact is active */}
              {tabIndex === PROFILE_TABS.CONTACT && <BtnInterest />}

              {/* If Statistic is active */}
              {tabIndex === PROFILE_TABS.STATISTIC && (
                <>
                  {(fsStatus ? fsStatus === FRIENDSHIP_ACTION.REMOVE : !user?.friendStatus) && <BtnAdd handleSetFriendship={handleSetFriendship} />}
                  {(fsStatus ? fsStatus === FRIENDSHIP_ACTION.REQUEST : user?.friendStatus === FRIEND_STATUSES.PENDING) && (
                    <BtnCancel handleSetFriendship={handleSetFriendship} />
                  )}
                  {user?.friendStatus === FRIEND_STATUSES.SENT && <BtnAcceptDecline handleSetFriendship={handleSetFriendship} />}
                  {/* if the user is already a friend */}
                  {user?.friendStatus === FRIEND_STATUSES.ACCEPTED && (
                    <>
                      {!isUnfriendBtn ? (
                        <BtnFriend toggleUnfriendBtn={toggleUnfriendBtn} />
                      ) : (
                        <BtnUnfriend toggleUnfriendBtn={toggleUnfriendBtn} handleSetFriendship={handleSetFriendship} />
                      )}
                    </>
                  )}
                </>
              )}
            </>
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
