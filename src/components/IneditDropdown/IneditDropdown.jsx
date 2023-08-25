import { Listbox } from '@headlessui/react'
import React, { useState } from 'react'

function IneditDropdown({ value, updateRequest, options }) {
  const [val, setVal] = useState(value)
  const { data } = options

  const handleOnChange = (v) => {
    updateRequest(v)
    setVal(v)
  }

  return (
    <Listbox value={val} onChange={handleOnChange}>
      <Listbox.Button className="p-0">{val}</Listbox.Button>
      <div className="relative">
        <Listbox.Options className="absolute p-3 bg-white top-[-100%]">
          {data.map((option) => (
            <Listbox.Option key={option.value} value={option.value}>
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

export default IneditDropdown
