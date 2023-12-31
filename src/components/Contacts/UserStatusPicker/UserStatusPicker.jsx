import React from 'react'
import { v4 as rid } from 'uuid'
import { userStatuses } from '../../../constants/enum'
import { handleEnter } from '../../../utils'

function UserStatusPicker({ activeStatus, isOpened, updateRequest }) {
  const handleOnChange = (status) => {
    updateRequest(status)
  }
  return (
    <div className={`flex justify-around gap-3 px-40 transition-all items-center ${isOpened ? 'h-8' : 'h-0 mt-[-1rem]'}`}>
      {isOpened &&
        userStatuses.map((status, i) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleOnChange(status.text)}
            onKeyDown={(e) => handleEnter(e)}
            key={`userStatus_${rid()}`}
            className={`${activeStatus === status.value ? status.bgColor : 'bg-[#ccc] opacity-30'} ${
              status.hoverBgColor
            } text-sm px-3 pt-[0.25rem] pb-[0.3rem] cursor-pointer rounded-full text-white h-max flex `}
          >
            {status.text}
          </div>
        ))}
    </div>
  )
}

export default UserStatusPicker
