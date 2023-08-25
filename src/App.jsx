import React, { useEffect, useMemo, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { AnimatePresence } from 'framer-motion'
import { COMPONENT_KEYS, MOBILE_STEP, RIGHT_CARD_MODE, cardAnimation } from './constants/enum'
import { ChatBoxWrapper, ContactsWrapper, LoginWrapper, ProfileWrapper } from './containers'
import AppContext from './contexts/AppContext'
import { useIsMobile } from './hooks'
import { auth, subscribeToUsers } from './services/firebase'

function App() {
  const [authUser] = useAuthState(auth)
  const [me, setMe] = useState(null)
  const [isMobile, mobileStep, setMobileStep] = useIsMobile()
  const [selectedUser, setSelectedUser] = useState(null)
  const [rightCardMode, setRightCardMode] = useState(RIGHT_CARD_MODE.CHATBOX)
  // set init state for framer motion animation
  const [isMounted, setIsMounted] = useState(false)

  /* current user subscription */
  useEffect(() => {
    if (!authUser) return
    const unsubscribe = subscribeToUsers(authUser.uid, (user) => setMe(user))
    return () => unsubscribe()
  }, [authUser])

  /* delaytime between motion initial animation & main animation (only happend once on initial load) */
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1000)
  }, [])

  const contexts = useMemo(() => {
    return { isMobile, mobileStep, setMobileStep, isMounted, me, setSelectedUser, setRightCardMode }
  }, [isMobile, mobileStep, setMobileStep, isMounted, me, setSelectedUser, setRightCardMode])

  return (
    <AppContext.Provider value={contexts}>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16 max-w-full">
        {/* login wrapper */}
        {!authUser && <LoginWrapper isLoginWrapper={true} auth={auth} anim={cardAnimation.login} key={COMPONENT_KEYS.LOGIN} />}

        {/* contacts wrapper: LEFT PANEL */}
        {authUser && <ContactsWrapper step={MOBILE_STEP.LEFT_CARD} anim={cardAnimation.contacts} key={COMPONENT_KEYS.CONTACTS} />}

        <AnimatePresence exitBeforeEnter initial mode="wait" onExitComplete={() => null}>
          {/* chatbox wrapper: RIGHT PANEL */}
          {authUser && me && rightCardMode === RIGHT_CARD_MODE.CHATBOX && (
            <ChatBoxWrapper
              user={me}
              friendId={selectedUser?.uid}
              friendStatus={selectedUser?.status}
              step={MOBILE_STEP.RIGHT_CARD}
              anim={cardAnimation.chatbox}
              key={COMPONENT_KEYS.CHATBOX}
            />
          )}

          {/* profile wrapper: RIGHT PANEL */}
          {authUser && selectedUser && rightCardMode === RIGHT_CARD_MODE.PROFILE && (
            <ProfileWrapper
              user={selectedUser.uid === me.uid ? me : selectedUser}
              isMe={selectedUser.uid === me.uid}
              friendStatus={selectedUser?.status}
              step={MOBILE_STEP.RIGHT_CARD}
              anim={cardAnimation.profile}
              key={COMPONENT_KEYS.PROFILE}
            />
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  )
}

export default App
