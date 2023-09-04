import React, { useEffect, useRef, useState } from 'react'
import { handleEnter } from '../../utils'

function IneditInput({ value, updateRequest, options = {} }) {
  const [val, setVal] = useState(value)
  const [width, setWidth] = useState(0)
  const [isValid, setIsValid] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const spanRef = useRef()
  const inputRef = useRef()
  const { isRequired = false, type = 'text', regexp = null, rightPad = 7, placeHolder = '' } = options

  useEffect(() => setWidth(spanRef.current.offsetWidth + rightPad), [val])

  const switchToEditMode = () => {
    setEditMode(true)
    inputRef.current.focus()
  }

  const handleOnChange = (e) => {
    const rawValue = e.target.value
    setVal(rawValue)
    if (isRequired) rawValue === '' && setIsValid(false)
    setIsValid(regexp ? regexp.test(rawValue) : true)
  }

  const handleOnBlur = (e) => {
    e.stopPropagation()
    const value = type === 'number' ? inputRef.current.valueAsNumber : inputRef.current.value
    if (isValid) updateRequest(value)
    else {
      setVal(value)
      setIsValid(true)
    }
    setEditMode(false)
  }

  const handleOnKeyDown = (e) => {
    e.stopPropagation()
    if (e.key === 'Enter' || e.keyCode === 13) inputRef.current.blur()
  }

  return (
    <div className="relative" onClick={switchToEditMode} onKeyDown={(e) => handleEnter(e, switchToEditMode)} tabIndex={0}>
      <span ref={spanRef} className={`${editMode ? 'invisible' : 'visible'} px-1`}>
        {val !== null ? val : placeHolder}
      </span>
      <input
        tabIndex={-1}
        ref={inputRef}
        type={type}
        style={{ width }}
        value={val !== null ? val : placeHolder}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
        className={`${editMode ? 'opcity-100' : 'opacity-0'} cursor-pointer min-w-[10px] pl-1 ${
          isRequired && !isValid && 'outline-danger'
        } absolute top-0 left-0`}
      />
    </div>
  )
}

export default IneditInput
