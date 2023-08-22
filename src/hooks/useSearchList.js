import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/firebase'

const useSearchList = (userId) => {
  const [searchList, setSearchList] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (searchTerm === '') return setSearchList(null)

    const fetchSearchList = async () => {
      const data = await fetchUsers(searchTerm, userId)
      setSearchList(data)
    }
    fetchSearchList()
  }, [searchTerm])

  return [searchList, searchTerm, setSearchTerm]
}

export default useSearchList
