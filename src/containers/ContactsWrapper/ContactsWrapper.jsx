import React, { useEffect } from 'react'
import { FriendList, SearchBar, UserNav } from '../../components'
import { useSearchList, useUserData } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function ContactsWrapper({ select, setConversationId }) {
  const [user, friendList] = useUserData()
  const [searchList, searchTerm, setSearchTerm] = useSearchList()

  /* select first friend chat box on inital load */
  useEffect(() => select(friendList[0]), [friendList])

  return (
    <section className="flex flex-col gap-5 p-5 justify-start w-screen h-screen md:w-[30vw] md:h-auto md:max-h-[70vh]">
      <UserNav user={user} />
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <FriendList userId={user?.uid} select={select} setConversationId={setConversationId} friendList={searchList || friendList} />
    </section>
  )
}

export default WithCard(ContactsWrapper)
