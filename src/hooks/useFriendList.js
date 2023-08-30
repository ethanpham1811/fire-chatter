import { useEffect, useState } from 'react'
import { subscribeToFriendList } from '../services/firebase'
import useSearchList from './useSearchList'

const useFriendList = (me) => {
  const [friendList, setFriendList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchList, searchTerm, setSearchTerm] = useSearchList(me?.uid, setIsLoading)
  const [mergeList, setMergeList] = useState(null)

  /* Merge search-list with friend-list to inject "friendStatus data" from friend-list onto search-list */
  useEffect(() => {
    searchList
      ? setMergeList(
          searchList.map((user) => {
            const match = friendList.filter((friend) => friend.uid === user.uid)[0]
            return { ...user, ...match }
          })
        )
      : setMergeList(null)
  }, [searchList])

  /* friend list subscription */
  useEffect(() => {
    if (!me) return
    const unsubscribe = subscribeToFriendList(me.uid, (data) => {
      setFriendList(data)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [me])

  return [mergeList, friendList, searchTerm, setSearchTerm, isLoading]
}

export default useFriendList
