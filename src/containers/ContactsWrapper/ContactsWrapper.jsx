import React, { useEffect, useState } from 'react'
import { FriendList, SearchBar, UserNav } from '../../components'
import { useSearchList } from '../../hooks'
import { subscribeToFriendList } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function ContactsWrapper({ user, selectUser, setRightCardMode }) {
  const [friendList, setFriendList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchList, searchTerm, setSearchTerm] = useSearchList(user?.uid, setIsLoading)
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
    if (!user) return
    const unsubscribe = subscribeToFriendList(user.uid, (data) => {
      setFriendList(data)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [user])

  return (
    <section className="flex flex-col gap-5 p-5 justify-start w-screen h-screen md:w-[30vw] md:h-auto md:max-h-[70vh]">
      <UserNav isLoading={isLoading} user={user} setRightCardMode={setRightCardMode} selectUser={selectUser} isMe />
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <FriendList
        isLoading={isLoading}
        setRightCardMode={setRightCardMode}
        selectUser={selectUser}
        friendList={mergeList || friendList}
        setSearchTerm={setSearchTerm}
      />
    </section>
  )
}

export default WithCard(ContactsWrapper)
