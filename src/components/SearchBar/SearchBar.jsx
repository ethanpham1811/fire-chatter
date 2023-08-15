import React, { useState } from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
  }

  return (
    <form className="flex-1 relative">
      <input type="text" onChange={handleSearch} className="w-full p-2 border-2 rounded-md" placeholder="Search..." />
      <FaDeleteLeft
        onClick={() => setSearchTerm('')}
        size={35}
        className="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer opacity-50 hover:opacity-100"
      />
    </form>
  )
}

export default SearchBar
