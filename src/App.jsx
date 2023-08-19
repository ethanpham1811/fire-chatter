import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { CARD_ANIM, MOBILE_STEP } from './constants/enum'
import { ContactsWrapper, LoginWrapper } from './containers'
import ProfileWrapper from './containers/ProfileWrapper/ProfileWrapper'
import AppContext from './contexts/AppContext'
import { useIsMobile } from './hooks'
import { auth, subscribeToUsers } from './services/firebase'

function App() {
  const [user, loading] = useAuthState(auth)
  const [curUser, setCurUser] = useState(null)
  const [isMobile, mobileStep, setMobileStep] = useIsMobile()
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [conversationId, setConversationId] = useState(null)

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
            select={setSelectedFriend}
            setConversationId={setConversationId}
            animation={CARD_ANIM.SLIDE_LEFT}
            user={curUser}
          />
        )}
        {curUser && selectedFriend && (
          // <ChatBoxWrapper
          //   mobileStep={mobileStep}
          //   isMobile={isMobile}
          //   step={MOBILE_STEP.RIGHT_CARD}
          //   user={curUser}
          //   friend={selectedFriend}
          //   conversationId={conversationId}
          //   animation={CARD_ANIM.SCALE_IN}
          // />
          <ProfileWrapper user={curUser} mobileStep={mobileStep} isMobile={isMobile} step={MOBILE_STEP.RIGHT_CARD} animation={CARD_ANIM.SCALE_IN} />
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App
