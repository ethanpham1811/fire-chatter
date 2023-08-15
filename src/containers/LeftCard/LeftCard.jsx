import React, { useEffect } from 'react'
import { SearchBar, FriendList, UserNav } from '../../components'
import { useMobileMode, useUserData } from '../../hooks'
import WithCard from '../../wrappers/WithCard/WithCard'

function LeftCard({ select, setConversationId }) {
  const [user, friendList] = useUserData()

  const { mobileMode } = useMobileMode()

  useEffect(() => {
    console.log(mobileMode)
  }, [mobileMode])

  useEffect(() => {
    select(friendList[0])
  }, [friendList])

  return (
    <section className="w-[30vw] max-h-[70vh] flex flex-col gap-5 over">
      <UserNav user={user} />
      {mobileMode}
      <SearchBar />
      <FriendList userId={user?.uid} select={select} setConversationId={setConversationId} friendList={friendList} />
    </section>
  )
}

export default WithCard(LeftCard)
