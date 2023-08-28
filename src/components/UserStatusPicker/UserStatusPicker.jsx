import React from 'react'
import { v4 as rid } from 'uuid'
import { userStatuses } from '../../constants/enum'

function UserStatusPicker({ activeStatus, isOpened, updateRequest }) {
  const handleOnChange = (status) => {
    updateRequest(status)
  }
  return (
    <div className={`flex justify-around gap-4 md:px-20 transition-all items-center ${isOpened ? 'h-8' : 'h-0 mt-[-1rem]'}`}>
      {isOpened &&
        userStatuses.map((status, i) => (
          <div
            onClick={() => handleOnChange(status.text)}
            key={`userStatus_${rid()}`}
            className={`${activeStatus === status.value ? status.bgColor : 'bg-[#ccc] opacity-30'} ${
              status.hoverBgColor
            } text-sm px-3 py-1 cursor-pointer rounded-full text-white h-max`}
          >
            {status.text}
          </div>
        ))}
    </div>
  )
}

export default UserStatusPicker
