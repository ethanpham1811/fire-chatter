import { useWindowSize } from '@uidotdev/usehooks'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { CARD_ANIM, MOBILE_STEP } from './constants/enum'
import { ContactsWrapper, LoginWrapper } from './containers'
import ProfileWrapper from './containers/ProfileWrapper/ProfileWrapper'
import AppContext from './contexts/AppContext'
import { auth } from './services/firebase'

function App() {
  const [user, loading] = useAuthState(auth)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [conversationId, setConversationId] = useState(null)

  /* reorganize layout on resizing window & mobile mode */
  const size = useWindowSize()
  const [mobileStep, setMobileStep] = useState(MOBILE_STEP.LEFT_CARD)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    if (!size.width) return
    if (size.width < 1024) !isMobile && setIsMobile(true)
    else isMobile && setIsMobile(false)
  }, [size.width])

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
            select={setSelectedFriend}
            setConversationId={setConversationId}
            animation={CARD_ANIM.SLIDE_LEFT}
          />
        )}
        {user && selectedFriend && (
          // <ChatBoxWrapper
          //   mobileStep={mobileStep}
          //   isMobile={isMobile}
          //   step={MOBILE_STEP.RIGHT_CARD}
          //   user={user}
          //   friend={selectedFriend}
          //   conversationId={conversationId}
          //   animation={CARD_ANIM.SCALE_IN}
          // />
          <ProfileWrapper user={user} mobileStep={mobileStep} isMobile={isMobile} step={MOBILE_STEP.RIGHT_CARD} animation={CARD_ANIM.SCALE_IN} />
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App
