import React from 'react'
import { PROFILE_TABS } from '../../../constants/enum'
import { editUser } from '../../../services/firebase'
import IneditInput from '../../IneditInput/IneditInput'
import ProfileGenderEditor from '../ProfileGenderEditor/ProfileGenderEditor'

function ProfileHeader({ user, tabIndex, isMe }) {
  return (
    <header className="relative bg-secondary py-3 px-7 pt-7">
      <h2 className="flex items-center mt-3">
        {isMe ? (
          <IneditInput options={{ isRequired: true }} value={user.displayName} updateRequest={(val) => editUser({ ...user, displayName: val })} />
        ) : (
          user.displayName || '<unknown>'
        )}
        <ProfileGenderEditor user={user} isMe={isMe} />
      </h2>
      {tabIndex === PROFILE_TABS.CONTACT && (
        <div className="mt-3 text-xs flex">
          {isMe ? (
            <IneditInput options={{ placeHolder: '[Your about]' }} value={user.about} updateRequest={(val) => editUser({ ...user, about: val })} />
          ) : (
            user.about || '<unknown>'
          )}
        </div>
      )}
    </header>
  )
}

export default ProfileHeader
