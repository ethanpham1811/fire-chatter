import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/firebase'

const useSearchList = (userId, setIsLoading) => {
  const [searchList, setSearchList] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!userId) return
    if (searchTerm === '') return setSearchList(null)
    setIsLoading(true)

    const fetchSearchList = async () => {
      const data = await fetchUsers(searchTerm, userId)
      setSearchList(data)
      setIsLoading(false)
    }
    fetchSearchList()
  }, [searchTerm])

  return [searchList, searchTerm, setSearchTerm]
}

export default useSearchList
