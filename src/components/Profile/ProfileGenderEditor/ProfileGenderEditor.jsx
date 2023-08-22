import React from 'react'
import { TbGenderFemale, TbGenderMale } from 'react-icons/tb'
import { Tooltip } from 'react-tooltip'
import { editUser } from '../../../services/firebase'

function ProfileGenderEditor({ user, isMe }) {
  const handleEditAge = () => {
    isMe && editUser({ gender: !user.gender }, user.uid)
  }

  return (
    <span
      onClick={handleEditAge}
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
