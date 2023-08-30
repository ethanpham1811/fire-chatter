import React, { useContext } from 'react'
import { FriendList, SearchBar, UserNav } from '../../components'
import AppContext from '../../contexts/AppContext'
import { useFriendList } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function ContactsWrapper() {
  const { me } = useContext(AppContext)
  const [mergeList, friendList, searchTerm, setSearchTerm, isLoading] = useFriendList(me)

  return (
    <section className="flex flex-col gap-5 p-5 justify-start w-screen h-screen md:w-[70vw] lg:w-[30vw] xl:w-[35vw] 2xl:w-[25vw] md:h-auto md:max-h-[70vh]">
      <UserNav user={me} isMe />
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <FriendList isLoading={isLoading} friendList={mergeList || friendList} setSearchTerm={setSearchTerm} />
    </section>
  )
}

export default WithCard(ContactsWrapper)
