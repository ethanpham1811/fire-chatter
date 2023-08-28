import React, { useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'
import './DropDownlist.css'

function DropDownlist({ value, updateRequest, options }) {
  const { data, anim } = options

  useEffect(() => {
    console.log(value)
  }, [value])

  const handleOnChange = (e, data) => {
    updateRequest(data.value)
  }

  return (
    // <motion.div
    //   layout
    //   variants={anim.animation}
    //   key={anim.key}
    //   initial="hidden"
    //   animate="visible"
    //   exit="exit"
    //   tabIndex={0}
    //   className="cursor-pointer"
    // >
    <>{value && <Dropdown pointing="top" className="user-status__dropdown" inline options={data} defaultValue={value} onChange={handleOnChange} />}</>
  )
}

export default DropDownlist
