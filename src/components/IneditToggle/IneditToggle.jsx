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
        <span key={`toggle_${rid()}`}>
          {val === option && (
            <motion.div
              layout
              variants={anim.animation}
              initial="hidden"
              animate="visible"
              exit="exit"
              tabIndex={0}
              onClick={toggleNextOption}
              className="cursor-pointer"
            >
              <div>{option}</div>
            </motion.div>
          )}
        </span>
      ))}
    </>
  )
}

export default IneditToggle
