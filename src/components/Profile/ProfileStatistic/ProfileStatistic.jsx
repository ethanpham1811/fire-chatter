import React from 'react'
import { IneditInput, IneditToggle } from '../../'
import { positionTitle, regexp, toggleAnimation } from '../../../constants/enum'
import { editUser } from '../../../services/firebase'

function ProfileStatistic({ user, isMe }) {
  return (
    <>
      <ul className="flex flex-1 w-full mb-2">
        <li className="flex flex-1 flex-col justify-center items-center">
          Exp (yrs)
          <span className="text-3xl">
            {isMe ? (
              <IneditInput
                options={{ isRequired: true, type: 'number', regexp: regexp.positiveNum, rightPad: 0 }}
                value={user.exp || 0}
                updateRequest={(val) => editUser({ exp: val }, user.uid)}
              />
            ) : (
              user.exp || 0
            )}
          </span>
        </li>
        <li className="flex flex-1 flex-col justify-center items-center">
          Projects
          <span className="text-3xl flex">
            {isMe ? (
              <IneditInput
                options={{ isRequired: true, type: 'number', regexp: regexp.positiveNum, rightPad: 0 }}
                value={user.projects || 0}
                updateRequest={(val) => editUser({ projects: val }, user.uid)}
              />
            ) : (
              user.projects || 0
            )}
            +
          </span>
        </li>
        <li className="flex flex-1 flex-col justify-center items-center">
          Position
          <span className="text-3xl">
            {isMe ? (
              <IneditToggle
                options={{ data: positionTitle, anim: toggleAnimation }}
                value={user.position}
                updateRequest={(val) => editUser({ position: val }, user.uid)}
              />
            ) : (
              user.position || 'N/A'
            )}
          </span>
        </li>
      </ul>
      <ul className="flex flex-1 w-full">
        <li className="flex flex-1 flex-col justify-center items-center">
          Connections<span className="text-3xl">{user.statistic?.connections || '0'}</span>
        </li>
        <li className="flex flex-1 flex-col justify-center items-center">
          Views<span className="text-3xl">{user.statistic?.views || '0'}</span>
        </li>
        <li className="flex flex-1 flex-col justify-center items-center">
          Recs<span className="text-3xl">{user.statistic?.recs || '0'}</span>
        </li>
      </ul>
    </>
  )
}

export default ProfileStatistic
