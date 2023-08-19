import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { CARD_ANIM, MOBILE_STEP, RIGHT_CARD_MODE } from './constants/enum'
import { ChatBoxWrapper, ContactsWrapper, LoginWrapper } from './containers'
import ProfileWrapper from './containers/ProfileWrapper/ProfileWrapper'
import AppContext from './contexts/AppContext'
import { useIsMobile } from './hooks'
import { auth, subscribeToUsers } from './services/firebase'

function App() {
  const [user, loading] = useAuthState(auth)
  const [curUser, setCurUser] = useState(null)
  const [isMobile, mobileStep, setMobileStep] = useIsMobile()
  const [selectedUser, setSelectedUser] = useState(null)
  // const [selectedProfileId, setSelectedProfileId] = useState(null)
  const [rightCardMode, setRightCardMode] = useState(RIGHT_CARD_MODE.CHATBOX)

  /* current user subscription */
  useEffect(() => {
    if (!user) return
    const unsubscribe = subscribeToUsers(user.uid, (user) => setCurUser(user))
    return () => unsubscribe()
  }, [user])

  return (
    <AppContext.Provider value={{ mobileStep, setMobileStep }}>
      <div className="absolute top-0 left-0 p-3 hidden">
        <img src="" alt="logo" />
      </div>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16">
        {!curUser && !loading && <LoginWrapper isLoginWrapper={true} auth={auth} animation={CARD_ANIM.SLIDE_UP} />}
        {curUser && (
          <ContactsWrapper
            mobileStep={mobileStep}
            isMobile={isMobile}
            step={MOBILE_STEP.LEFT_CARD}
            animation={CARD_ANIM.SLIDE_LEFT}
            user={curUser}
            selectUser={setSelectedUser}
            setRightCardMode={setRightCardMode}
          />
        )}
        {curUser && selectedUser && rightCardMode === RIGHT_CARD_MODE.CHATBOX && (
          <ChatBoxWrapper
            mobileStep={mobileStep}
            isMobile={isMobile}
            step={MOBILE_STEP.RIGHT_CARD}
            user={curUser}
            friend={selectedUser}
            animation={CARD_ANIM.SCALE_IN}
            setRightCardMode={setRightCardMode}
          />
        )}
        {selectedUser && rightCardMode === RIGHT_CARD_MODE.PROFILE && (
          <ProfileWrapper
            user={selectedUser}
            mobileStep={mobileStep}
            isMobile={isMobile}
            step={MOBILE_STEP.RIGHT_CARD}
            animation={CARD_ANIM.SCALE_IN}
            isMe={selectedUser.uid === curUser.uid}
          />
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App
