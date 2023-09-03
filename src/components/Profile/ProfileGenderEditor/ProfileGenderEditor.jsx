import React from 'react'
import { Tooltip } from 'react-tooltip'
import { editUser } from '../../../services/firebase'
import { handleEnter } from '../../../utils'
import { TbGenderFemale, TbGenderMale } from '../../../utils/icons'

function ProfileGenderEditor({ user, isMe }) {
  const handleEditAge = () => isMe && editUser({ ...user, gender: !user.gender })

  return (
    <span
      tabIndex={0}
      onClick={handleEditAge}
      onKeyDown={(e) => handleEnter(e, handleEditAge)}
      data-tooltip-place="right"
      data-tooltip-id="gender-edit"
      data-tooltip-content="click to swap"
      className={`${isMe && 'cursor-pointer'} text-sm ml-2`}
    >
      {user.gender ? <TbGenderMale size={20} className="text-genderMale" /> : <TbGenderFemale size={20} className="text-genderFemale" />}
      {isMe && <Tooltip style={{ backgroundColor: '#9500f8', padding: '0.5rem' }} id="gender-edit" />}
    </span>
  )
}

export default ProfileGenderEditor
