import { motion } from 'framer-motion'
import React from 'react'

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { PROFILE_TABS, PROFILE_TAB_ANIM } from '../../../constants/enum'
import { addFriend } from '../../../services/firebase'
import ProfileContact from '../ProfileContact/ProfileContact'
import ProfileStatistic from '../ProfileStatistic/ProfileStatistic'

function ProfileTabNav({ user, isMe, myId, setTabIndex, tabIndex }) {
  const handleAddFriend = (e) => {
    e.preventDefault()
    !isMe && addFriend(user, myId)
  }
  return (
    <Tabs
      className="flex flex-1 flex-col transition-all bg-main shadow-innerChatBox relative"
      selectedIndex={tabIndex}
      onSelect={(i) => setTabIndex(i)}
    >
      <TabList className="flex items-center">
        <Tab tabIndex="-1" className="flex flex-1 p-1 justify-center cursor-pointer outline-none" selectedClassName="bg-darkGray text-white">
          <a className="p-2 flex-1 text-center" href="" onClick={(e) => e.preventDefault()}>
            Contact
          </a>
        </Tab>
        <Tab
          tabIndex="-1"
          className="flex flex-1 p-1 justify-center cursor-pointer outline-none"
          selectedClassName={`${tabIndex === PROFILE_TABS.STATISTIC && !isMe ? 'bg-danger' : 'bg-darkGray'} text-white`}
        >
          {isMe ? (
            <a className="p-2 flex-1 text-center" href="" onClick={(e) => e.preventDefault()}>
              My Info
            </a>
          ) : (
            <a className="p-2 flex-1 text-center" href="" onClick={handleAddFriend}>
              {tabIndex === PROFILE_TABS.CONTACT ? 'Interest?' : 'Add Me'}
            </a>
          )}
        </Tab>
      </TabList>

      {/* contacts panel */}
      <TabPanel className={`bg-secondary py-5 px-7 flex-1 flex-col ${tabIndex === PROFILE_TABS.CONTACT ? 'flex' : 'hidden'}`}>
        <motion.div layout variants={PROFILE_TAB_ANIM} key="profile-tab-contact" initial="hidden" animate="visible" exit="exit">
          {tabIndex === PROFILE_TABS.CONTACT && <ProfileContact user={user} />}
        </motion.div>
      </TabPanel>

      {/* profile panel */}
      <TabPanel className={`bg-secondary py-5 px-7 flex-1 flex-col ${tabIndex === PROFILE_TABS.STATISTIC ? 'flex' : 'hidden'} text-xs`}>
        <motion.div layout variants={PROFILE_TAB_ANIM} key="profile-tab-statistic" initial="hidden" animate="visible" exit="exit">
          {tabIndex === PROFILE_TABS.STATISTIC && <ProfileStatistic user={user} />}
        </motion.div>
      </TabPanel>
    </Tabs>
  )
}

export default ProfileTabNav
