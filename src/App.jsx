import React, { useMemo, useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { NoFriendWindow, NotificationBoard } from './components'
import { COMPONENT_KEYS, MOBILE_STEP, RIGHT_CARD_MODE, cardAnimation } from './constants/enum'
import { ChatBoxWrapper, ContactsWrapper, LoginWrapper, ProfileWrapper } from './containers'
import AppContext from './contexts/AppContext'
import { useInitApp, useIsMobile, useSelectedUser } from './hooks'
import { auth } from './services/firebase'

function App() {
  const [isMobile, mobileStep, setMobileStep] = useIsMobile()
  const [authUser, me, isMounted, isLoading] = useInitApp()
  const [selectedUser, setSelectedUser, setSelectedFsId] = useSelectedUser(me?.uid)
  const [rightCardMode, setRightCardMode] = useState(RIGHT_CARD_MODE.CHATBOX)

  /* useMemo for Context object */
  const contexts = useMemo(() => {
    return { isMobile, mobileStep, setMobileStep, isMounted, me, setSelectedFsId, setSelectedUser, setRightCardMode }
  }, [isMobile, mobileStep, setMobileStep, isMounted, me, setSelectedFsId, setSelectedUser, setRightCardMode])

  return (
    <AppContext.Provider value={contexts}>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16 max-w-full">
        {/* login wrapper */}
        {!authUser && !isLoading && <LoginWrapper isLoginWrapper={true} auth={auth} anim={cardAnimation.login} key={COMPONENT_KEYS.LOGIN} />}

        {/* contacts wrapper: LEFT PANEL */}
        {authUser && <ContactsWrapper step={MOBILE_STEP.LEFT_CARD} anim={cardAnimation.contacts} key={COMPONENT_KEYS.CONTACTS} />}

        <AnimatePresence exitBeforeEnter initial mode="sync" onExitComplete={() => null}>
          {/* chatbox wrapper: RIGHT PANEL */}
          {authUser && me && selectedUser && rightCardMode === RIGHT_CARD_MODE.CHATBOX && (
            <ChatBoxWrapper user={me} friend={selectedUser} step={MOBILE_STEP.RIGHT_CARD} anim={cardAnimation.chatbox} key={COMPONENT_KEYS.CHATBOX} />
          )}

          {/* profile wrapper: RIGHT PANEL */}
          {authUser && selectedUser && rightCardMode === RIGHT_CARD_MODE.PROFILE && (
            <ProfileWrapper
              user={selectedUser.uid === me.uid ? me : selectedUser}
              isMe={selectedUser.uid === me.uid}
              step={MOBILE_STEP.RIGHT_CARD}
              anim={cardAnimation.profile}
              key={COMPONENT_KEYS.PROFILE}
            />
          )}
          {/* selecting no friend window */}
          {!selectedUser && <NoFriendWindow step={MOBILE_STEP.RIGHT_CARD} anim={cardAnimation.chatbox} key={COMPONENT_KEYS.CHATBOX} />}
        </AnimatePresence>
      </div>
      <NotificationBoard />
    </AppContext.Provider>
  )
}

export default App
