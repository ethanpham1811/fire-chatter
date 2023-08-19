import React, { useEffect } from 'react'
import { FriendList, SearchBar, UserNav } from '../../components'
import { useContactList, useSearchList } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function ContactsWrapper({ user, selectUser, setRightCardMode }) {
  const friendList = useContactList(user.uid)
  const [searchList, searchTerm, setSearchTerm] = useSearchList()

  /* select first friend chat box on inital load */
  useEffect(() => {
    selectUser(friendList[0])
  }, [friendList])

  return (
    <section className="flex flex-col gap-5 p-5 justify-start w-screen h-screen md:w-[30vw] md:h-auto md:max-h-[70vh]">
      <UserNav user={user} setRightCardMode={setRightCardMode} selectUser={selectUser} isMe />
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <FriendList setRightCardMode={setRightCardMode} selectUser={selectUser} friendList={searchList || friendList} />
    </section>
  )
}

export default WithCard(ContactsWrapper)
