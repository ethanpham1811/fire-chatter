import React from 'react'
import { PROFILE_TABS } from '../../../constants/enum'
import ProfileGenderEditor from '../ProfileGenderEditor/ProfileGenderEditor'

function ProfileHeader({ user, tabIndex, isMe }) {
  return (
    <header className="relative bg-secondary py-3 px-7">
      <h2 className="flex items-center mt-3">
        {user.displayName}
        <ProfileGenderEditor user={user} isMe={isMe} />
      </h2>
      {tabIndex === PROFILE_TABS.CONTACT && <p className="mt-3 text-xs">@n AI creator, designer, developer.</p>}
    </header>
  )
}

export default ProfileHeader
