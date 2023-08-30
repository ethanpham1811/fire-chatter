import React, { useMemo, useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { NotificationBoard } from './components'
import { COMPONENT_KEYS, MOBILE_STEP, RIGHT_CARD_MODE, cardAnimation } from './constants/enum'
import { ChatBoxWrapper, ContactsWrapper, LoginWrapper, ProfileWrapper } from './containers'
import AppContext from './contexts/AppContext'
import { useInitApp, useIsMobile } from './hooks'
import { auth } from './services/firebase'

function App() {
  const [isMobile, mobileStep, setMobileStep] = useIsMobile()
  const [authUser, me, isMounted, isLoading] = useInitApp()
  const [selectedUser, setSelectedUser] = useState(null)
  const [rightCardMode, setRightCardMode] = useState(RIGHT_CARD_MODE.CHATBOX)

  /* useMemo for Context object */
  const contexts = useMemo(() => {
    return { isMobile, mobileStep, setMobileStep, isMounted, me, setSelectedUser, setRightCardMode }
  }, [isMobile, mobileStep, setMobileStep, isMounted, me, setSelectedUser, setRightCardMode])

  return (
    <AppContext.Provider value={contexts}>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16 max-w-full">
        {/* login wrapper */}
        {!authUser && !isLoading && <LoginWrapper isLoginWrapper={true} auth={auth} anim={cardAnimation.login} key={COMPONENT_KEYS.LOGIN} />}

        {/* contacts wrapper: LEFT PANEL */}
        {authUser && <ContactsWrapper step={MOBILE_STEP.LEFT_CARD} anim={cardAnimation.contacts} key={COMPONENT_KEYS.CONTACTS} />}

        <AnimatePresence exitBeforeEnter initial mode="sync" onExitComplete={() => null}>
          {/* chatbox wrapper: RIGHT PANEL */}
          {authUser && me && rightCardMode === RIGHT_CARD_MODE.CHATBOX && (
            <ChatBoxWrapper
              user={me}
              friendId={selectedUser?.uid}
              friendStatus={selectedUser?.friendStatus}
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
              friendStatus={selectedUser?.friendStatus}
              step={MOBILE_STEP.RIGHT_CARD}
              anim={cardAnimation.profile}
              key={COMPONENT_KEYS.PROFILE}
            />
          )}
        </AnimatePresence>
      </div>
      <NotificationBoard />
    </AppContext.Provider>
  )
}

export default App
