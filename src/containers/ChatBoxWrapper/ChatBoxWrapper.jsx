import React from 'react'

import { ChatBoxWindow, FriendRequestWindow, NoFriendWindow } from '../../components'
import { FRIEND_STATUSES } from '../../constants/enum'
import WithCard from '../../wrappers/WithCard/WithCard'

function ChatBoxWrapper({ user, friend }) {
  return (
    <section className="flex flex-col gap-5 p-5 w-screen h-screen md:w-[70vw] lg:w-[45vw] xl:w-[35vw] 2xl:w-[25vw] md:max-h-[70vh] lg:min-h-[550px]">
      {friend && friend?.friendStatus === FRIEND_STATUSES.ACCEPTED && <ChatBoxWindow user={user} friend={friend} />}
      {friend && friend?.friendStatus !== FRIEND_STATUSES.ACCEPTED && <FriendRequestWindow user={user} friend={friend} />}
      {!friend && <NoFriendWindow />}
    </section>
  )
}

export default WithCard(ChatBoxWrapper)
