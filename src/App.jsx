import { useWindowSize } from '@uidotdev/usehooks'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { SignIn } from './components'
import { CARD_ANIM, MOBILE_STEP } from './constants/enum'
import { LeftCard, RightCard } from './containers'
import { MobileContext } from './contexts/MobileContext'
import { auth } from './services/firebase'

function App() {
  const [user, loading] = useAuthState(auth)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [conversationId, setConversationId] = useState(null)

  /* for mobile mode */
  const size = useWindowSize()
  const [mobileStep, setMobileStep] = useState(MOBILE_STEP.LEFT_CARD)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    if (!size.width) return
    if (size.width < 768) !isMobile && setIsMobile(true)
    else isMobile && setIsMobile(false)
  }, [size.width])

  return (
    <MobileContext.Provider value={{ mobileStep, setMobileStep }}>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16">
        {!user && !loading && <SignIn isSignIn={true} auth={auth} animation={CARD_ANIM.SLIDE_UP} />}
        {user && (
          <LeftCard
            mobileStep={mobileStep}
            isMobile={isMobile}
            card={MOBILE_STEP.LEFT_CARD}
            select={setSelectedFriend}
            setConversationId={setConversationId}
            animation={CARD_ANIM.SLIDE_LEFT}
          />
        )}
        {user && selectedFriend && (
          <RightCard
            mobileStep={mobileStep}
            isMobile={isMobile}
            card={MOBILE_STEP.RIGHT_CARD}
            user={user}
            friend={selectedFriend}
            conversationId={conversationId}
            animation={CARD_ANIM.SCALE_IN}
          />
        )}
      </div>
    </MobileContext.Provider>
  )
}

export default App
