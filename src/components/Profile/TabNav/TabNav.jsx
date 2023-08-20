import React from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { PROFILE_TABS } from '../../../constants/enum'
import ProfileContact from '../ProfileContact/ProfileContact'
import ProfileStatistic from '../ProfileStatistic/ProfileStatistic'

function TabNav({ user, isMe, setTabIndex, tabIndex }) {
  return (
    <Tabs className="flex flex-1 flex-col bg-main shadow-innerChatBox relative" selectedIndex={tabIndex} onSelect={(i) => setTabIndex(i)}>
      <TabList className="flex items-center">
        <Tab tabIndex="-1" className="flex flex-1 p-1 justify-center cursor-pointer outline-none" selectedClassName="bg-darkGray text-white">
          <a className="p-2 flex-1 text-center" href="" onClick={(e) => e.preventDefault()}>
            Contact
          </a>
        </Tab>
        <Tab
          tabIndex="-1"
          className={`flex flex-1 p-1 justify-center cursor-pointer outline-none ${tabIndex === PROFILE_TABS.STATISTIC && !isMe && 'bg-danger'}`}
          selectedClassName="text-white"
        >
          {isMe ? (
            <a className="p-2 flex-1 text-center" href="" onClick={(e) => e.preventDefault()}>
              My Info
            </a>
          ) : (
            <a className="p-2 flex-1 text-center" href="" onClick={(e) => e.preventDefault()}>
              {tabIndex === PROFILE_TABS.CONTACT ? 'Interest?' : 'Add Me'}
            </a>
          )}
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
  )
}

export default TabNav
