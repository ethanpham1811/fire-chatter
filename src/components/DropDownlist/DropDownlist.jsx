import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import './DropDownlist.css'

function DropDownlist({ value, updateRequest, options }) {
  const { data, anim } = options

  const handleOnChange = (e, data) => {
    updateRequest(data.value)
  }

  return (
    <>{value && <Dropdown pointing="top" className="user-status__dropdown" inline options={data} defaultValue={value} onChange={handleOnChange} />}</>
  )
}

export default DropDownlist
