import React, { useContext, useEffect, useState } from 'react'
import { FriendList, SearchBar, UserNav } from '../../components'
import AppContext from '../../contexts/AppContext'
import { useSearchList } from '../../hooks'
import { subscribeToFriendList } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function ContactsWrapper() {
  const { me } = useContext(AppContext)
  const [friendList, setFriendList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchList, searchTerm, setSearchTerm] = useSearchList(me?.uid, setIsLoading)
  const [mergeList, setMergeList] = useState(null)

  /* Merge search-list with friend-list to inject "friend status data" from friend-list onto search-list */
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

  return (
    <section className="flex flex-col gap-5 p-5 justify-start w-screen h-screen md:w-[70vw] lg:w-[30vw] xl:w-[35vw] 2xl:w-[25vw] md:h-auto md:max-h-[70vh]">
      <UserNav user={me} isMe />
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <FriendList isLoading={isLoading} friendList={mergeList || friendList} setSearchTerm={setSearchTerm} />
    </section>
  )
}

export default WithCard(ContactsWrapper)
