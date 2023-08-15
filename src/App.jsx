import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { SignIn } from './components'
import { LeftCard, RightCard } from './containers'
import { auth } from './services/firebase'
import { MOBILE_MODE } from './constants/enum'
import { MobileContext } from './contexts/MobileContext'

function App() {
  const [user] = useAuthState(auth)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const [mobileMode, setMobileMode] = useState(MOBILE_MODE.FRIEND_LIST)

  useEffect(() => {
    console.log(mobileMode)
  }, [mobileMode])

  return (
    <MobileContext.Provider value={{ mobileMode, setMobileMode }}>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16">
        {!user && <SignIn auth={auth} />}
        {user && mobileMode === MOBILE_MODE.FRIEND_LIST && <LeftCard select={setSelectedFriend} setConversationId={setConversationId} />}
        {user && mobileMode === MOBILE_MODE.CHAT_BOX && selectedFriend && (
          <RightCard user={user} friend={selectedFriend} conversationId={conversationId} />
        )}
      </div>
    </MobileContext.Provider>
  )
}

export default App
