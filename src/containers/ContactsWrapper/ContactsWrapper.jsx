import React, { useEffect, useState } from 'react'
import { FriendList, SearchBar, UserNav } from '../../components'
import { useSearchList } from '../../hooks'
import { subscribeToFriendList } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function ContactsWrapper({ user, selectUser, setRightCardMode }) {
  const [friendList, setFriendList] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  const [searchList, searchTerm, setSearchTerm] = useSearchList(user.uid)
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
    const unsubscribe = subscribeToFriendList(user.uid, (data) => {
      setFriendList(data)
      // firstLoad && selectUser(data[0])
      setFirstLoad(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <section className="flex flex-col gap-5 p-5 justify-start w-screen h-screen md:w-[30vw] md:h-auto md:max-h-[70vh]">
      <UserNav user={user} setRightCardMode={setRightCardMode} selectUser={selectUser} isMe />
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <FriendList setRightCardMode={setRightCardMode} selectUser={selectUser} friendList={mergeList || friendList} setSearchTerm={setSearchTerm} />
    </section>
  )
}

export default WithCard(ContactsWrapper)
