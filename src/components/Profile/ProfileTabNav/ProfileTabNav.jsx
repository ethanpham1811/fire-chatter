import { motion } from 'framer-motion'
import React, { useState } from 'react'

import { AiOutlineCheck, AiOutlineUserAdd } from 'react-icons/ai'
import { FaUserCheck } from 'react-icons/fa6'
import { FcCancel } from 'react-icons/fc'
import { RxCross1 } from 'react-icons/rx'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { FRIEND_STATUSES, PROFILE_TABS, PROFILE_TAB_ANIM } from '../../../constants/enum'
import { removeFriend, setFriendship } from '../../../services/firebase'
import ProfileContact from '../ProfileContact/ProfileContact'
import ProfileStatistic from '../ProfileStatistic/ProfileStatistic'
import './ProfileTabNav.css'

function ProfileTabNav({ user, isMe, me, setTabIndex, tabIndex }) {
  const [friendshipStatus, setFriendshipStatus] = useState(user.status)
  const [isUnfriendBtn, setIsUnfriendBtn] = useState(false)

  const handleAddFriend = (e) => {
    e.preventDefault()
    setFriendship(user, me.uid, FRIEND_STATUSES.SENT)
    setFriendship(me, user.uid, FRIEND_STATUSES.PENDING)
    setFriendshipStatus(FRIEND_STATUSES.SENT)
  }
  const handleAcceptFriend = (e) => {
    e.preventDefault()
    setFriendship(user, me.uid, FRIEND_STATUSES.ACCEPTED)
    setFriendship(me, user.uid, FRIEND_STATUSES.ACCEPTED)
    setFriendshipStatus(FRIEND_STATUSES.ACCEPTED)
  }
  const handleRemoveFriendship = (e) => {
    e.preventDefault()
    removeFriend(user.uid, me.uid)
    removeFriend(me.uid, user.uid)
    setFriendshipStatus(null)
  }
  const toggleUnfriendBtn = () => {
    setIsUnfriendBtn(!isUnfriendBtn)
  }
  return (
    <Tabs
      className="flex flex-1 flex-col transition-all bg-main shadow-innerChatBox relative"
      selectedIndex={tabIndex}
      onSelect={(i) => setTabIndex(i)}
    >
      <TabList className="flex items-center">
        <Tab
          tabIndex="-1"
          className="flex flex-1 justify-center cursor-pointer outline-none"
          selectedClassName="profile-nav-tab__contact-btn--active"
        >
          <a className="p-2 flex-1 flex justify-center" href="" onClick={(e) => e.preventDefault()}>
            Contact
          </a>
        </Tab>
        <Tab
          tabIndex="-1"
          className="flex flex-1 justify-center cursor-pointer outline-none"
          selectedClassName="profile-nav-tab__statistic-btn--active"
        >
          {isMe && (
            <a className="my-info-label p-2 flex-1 flex justify-center" href="" onClick={(e) => e.preventDefault()}>
              My Info
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.CONTACT && (
            <a className="interest-label p-2 flex-1 flex justify-center gap-3" href="" onClick={(e) => e.preventDefault()}>
              {tabIndex === PROFILE_TABS.CONTACT && 'Interest?'}
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && !friendshipStatus && (
            <a className="add-me-label p-2 flex-1 flex justify-center gap-3" href="" onClick={handleAddFriend}>
              Add Me
              <AiOutlineUserAdd size={20} />
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && friendshipStatus === FRIEND_STATUSES.SENT && (
            <a className="cancel-label p-2 flex-1 flex justify-center gap-3" href="" onClick={handleRemoveFriendship}>
              Cancel
              <FcCancel size={20} color="insta" />
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && friendshipStatus === FRIEND_STATUSES.PENDING && (
            <>
              <a className="accept-label p-2 flex-1 flex justify-center gap-3" href="" onClick={handleAcceptFriend}>
                <AiOutlineCheck size={20} />
              </a>
              <a className="reject-label p-2 flex-1 flex justify-center gap-3" href="" onClick={handleRemoveFriendship}>
                <RxCross1 size={20} color="insta" />
              </a>
            </>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && friendshipStatus === FRIEND_STATUSES.ACCEPTED && !isUnfriendBtn && (
            <a className="friend-label p-2 flex-1 flex justify-center gap-3" href="" onMouseEnter={toggleUnfriendBtn}>
              Friends
              <FaUserCheck size={20} />
            </a>
          )}
          {!isMe && tabIndex === PROFILE_TABS.STATISTIC && friendshipStatus === FRIEND_STATUSES.ACCEPTED && isUnfriendBtn && (
            <a
              className="unfriend-label p-2 flex-1 flex justify-center gap-3"
              href=""
              onClick={handleRemoveFriendship}
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
        <motion.div
          layout
          variants={PROFILE_TAB_ANIM}
          key="profile-tab-contact"
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col flex-1"
        >
          {tabIndex === PROFILE_TABS.CONTACT && <ProfileContact user={user} />}
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
          exit="exit"
          className="flex flex-col flex-1"
        >
          {tabIndex === PROFILE_TABS.STATISTIC && <ProfileStatistic user={user} />}
        </motion.div>
      </TabPanel>
    </Tabs>
  )
}

export default ProfileTabNav
