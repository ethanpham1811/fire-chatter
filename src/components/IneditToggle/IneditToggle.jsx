import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { v4 as rid } from 'uuid'

function IneditToggle({ value, updateRequest, options }) {
  const [val, setVal] = useState(value)
  const { data, anim } = options

  const toggleNextOption = () => {
    const curIndex = data.indexOf(val)
    const nextData = curIndex < data.length - 1 ? data[curIndex + 1] : data[0]
    updateRequest(nextData)
    setVal(nextData)
  }

  return (
    <>
      {data.map((option) => (
        <motion.div
          layout
          variants={anim.animation}
          key={`toggle_${rid()}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          tabIndex={0}
          onClick={toggleNextOption}
          className="cursor-pointer"
        >
          <div>{val === option && option}</div>
        </motion.div>
      ))}
    </>
  )
}

export default IneditToggle
