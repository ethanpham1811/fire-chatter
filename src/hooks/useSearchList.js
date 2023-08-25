import { useEffect, useState } from 'react'
import { fetchUsers } from '../services/firebase'
import { timeout } from '../utils'

const useSearchList = (userId, setIsLoading) => {
  const [searchList, setSearchList] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!userId) return
    if (searchTerm === '') return setSearchList(null)
    setIsLoading(true)

    const fetchSearchList = async () => {
      await timeout(700)
      const data = await fetchUsers(searchTerm, userId)
      setSearchList(data)
      setIsLoading(false)
    }
    fetchSearchList()
  }, [searchTerm])

  return [searchList, searchTerm, setSearchTerm]
}

export default useSearchList
