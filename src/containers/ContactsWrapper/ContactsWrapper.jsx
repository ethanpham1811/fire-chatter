import React, { useEffect } from 'react'
import { FriendList, SearchBar, UserNav } from '../../components'
import { useContactList, useSearchList } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function ContactsWrapper({ user, select, setConversationId }) {
  const friendList = useContactList(user.uid)
  const [searchList, searchTerm, setSearchTerm] = useSearchList()

  /* select first friend chat box on inital load */
  useEffect(() => {
    select(friendList[0])
  }, [friendList])

  return (
    <section className="flex flex-col gap-5 p-5 justify-start w-screen h-screen md:w-[30vw] md:h-auto md:max-h-[70vh]">
      <UserNav user={user} />
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <FriendList select={select} friendList={searchList || friendList} />
    </section>
  )
}

export default WithCard(ContactsWrapper)
