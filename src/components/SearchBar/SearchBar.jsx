import React from 'react'
import { FaDeleteLeft } from 'react-icons/fa6'

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  return (
    <form className="relative" onSubmit={handleSearch}>
      <input type="text" value={searchTerm} onChange={handleSearch} className="w-full p-2 border-2 rounded-md" placeholder="Search..." />
      <button
        type="submit"
        onClick={() => setSearchTerm('')}
        className="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer opacity-50 hover:opacity-100 p-0"
      >
        <FaDeleteLeft size={35} />
      </button>
    </form>
  )
}

export default SearchBar
