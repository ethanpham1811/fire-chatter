import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { CARD_ANIM, MOBILE_STEP, RIGHT_CARD_MODE } from './constants/enum'
import { ChatBoxWrapper, ContactsWrapper, LoginWrapper } from './containers'
import ProfileWrapper from './containers/ProfileWrapper/ProfileWrapper'
import AppContext from './contexts/AppContext'
import { useIsMobile } from './hooks'
import { auth, subscribeToUsers } from './services/firebase'

function App() {
  const [authUser, loading] = useAuthState(auth)
  const [user, setUser] = useState(null)
  const [isMobile, mobileStep, setMobileStep] = useIsMobile()
  const [selectedUser, setSelectedUser] = useState(null)
  // const [selectedProfileId, setSelectedProfileId] = useState(null)
  const [rightCardMode, setRightCardMode] = useState(RIGHT_CARD_MODE.CHATBOX)

  /* current user subscription */
  useEffect(() => {
    if (!authUser) return
    const unsubscribe = subscribeToUsers(authUser.uid, (user) => setUser(user))
    return () => unsubscribe()
  }, [authUser])

  return (
    <AppContext.Provider value={{ mobileStep, setMobileStep }}>
      <div className="absolute top-0 left-0 p-3 hidden">
        <img src="" alt="logo" />
      </div>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16">
        {!user && !loading && <LoginWrapper isLoginWrapper={true} auth={auth} animation={CARD_ANIM.SLIDE_UP} />}
        {user && (
          <ContactsWrapper
            mobileStep={mobileStep}
            isMobile={isMobile}
            step={MOBILE_STEP.LEFT_CARD}
            animation={CARD_ANIM.SLIDE_LEFT}
            user={user}
            selectUser={setSelectedUser}
            setRightCardMode={setRightCardMode}
          />
        )}
        {user && selectedUser && rightCardMode === RIGHT_CARD_MODE.CHATBOX && (
          <ChatBoxWrapper
            mobileStep={mobileStep}
            isMobile={isMobile}
            step={MOBILE_STEP.RIGHT_CARD}
            user={user}
            friend={selectedUser}
            animation={CARD_ANIM.SCALE_IN}
            selectUser={setSelectedUser}
            setRightCardMode={setRightCardMode}
          />
        )}
        {selectedUser && rightCardMode === RIGHT_CARD_MODE.PROFILE && (
          <ProfileWrapper
            user={selectedUser.uid === user.uid ? user : selectedUser}
            mobileStep={mobileStep}
            isMobile={isMobile}
            step={MOBILE_STEP.RIGHT_CARD}
            animation={CARD_ANIM.SCALE_IN}
            isMe={selectedUser.uid === user.uid}
          />
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App
