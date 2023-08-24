import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { AnimatePresence } from 'framer-motion'
import { CARD_ANIM, MOBILE_STEP, RIGHT_CARD_MODE } from './constants/enum'
import { ChatBoxWrapper, ContactsWrapper, LoginWrapper } from './containers'
import ProfileWrapper from './containers/ProfileWrapper/ProfileWrapper'
import AppContext from './contexts/AppContext'
import { useIsMobile } from './hooks'
import { auth, subscribeToUsers } from './services/firebase'

function App() {
  const [authUser] = useAuthState(auth)
  const [user, setUser] = useState(null)
  const [isMobile, mobileStep, setMobileStep] = useIsMobile()
  const [selectedUser, setSelectedUser] = useState(null)
  const [rightCardMode, setRightCardMode] = useState(RIGHT_CARD_MODE.CHATBOX)
  // set init state for framer motion animation
  const [isMounted, setIsMounted] = useState(false)

  /* current user subscription */
  useEffect(() => {
    if (!authUser) return
    const unsubscribe = subscribeToUsers(authUser.uid, (user) => setUser(user))
    return () => unsubscribe()
  }, [authUser])

  /* delaytime between motion initial animation & main animation (only happend once on initial load) */
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1000)
  }, [])

  useEffect(() => {
    // console.log(selectedUser)
  }, [selectedUser])

  return (
    <AppContext.Provider value={{ mobileStep, setMobileStep }}>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16">
        {!authUser && <LoginWrapper isLoginWrapper={true} auth={auth} initVariants={CARD_ANIM.SLIDE_UP} motionKey="login" key="login" />}

        {authUser && (
          <ContactsWrapper
            user={user}
            selectUser={setSelectedUser}
            mobileStep={mobileStep}
            isMobile={isMobile}
            step={MOBILE_STEP.LEFT_CARD}
            setRightCardMode={setRightCardMode}
            initVariants={CARD_ANIM.SLIDE_LEFT}
            motionKey="contacts"
            key="contacts"
          />
        )}
        <AnimatePresence exitBeforeEnter initial mode="popLayout" onExitComplete={() => null}>
          {authUser && user && rightCardMode === RIGHT_CARD_MODE.CHATBOX && (
            <ChatBoxWrapper
              user={user}
              friendId={selectedUser?.uid}
              friendStatus={selectedUser?.status}
              selectUser={setSelectedUser}
              mobileStep={mobileStep}
              isMobile={isMobile}
              step={MOBILE_STEP.RIGHT_CARD}
              setRightCardMode={setRightCardMode}
              initVariants={CARD_ANIM.SCALE_IN}
              mainVariants={CARD_ANIM.SWAP}
              motionKey="chatbox"
              key="chatbox"
              isMounted={isMounted}
            />
          )}
          {authUser && selectedUser && rightCardMode === RIGHT_CARD_MODE.PROFILE && (
            <ProfileWrapper
              user={selectedUser.uid === user.uid ? user : selectedUser}
              isMe={selectedUser.uid === user.uid}
              friendStatus={selectedUser?.status}
              me={user}
              mobileStep={mobileStep}
              isMobile={isMobile}
              step={MOBILE_STEP.RIGHT_CARD}
              initVariants={CARD_ANIM.SCALE_IN}
              mainVariants={CARD_ANIM.SWAP}
              motionKey="profile"
              key="profile"
              isMounted={isMounted}
            />
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  )
}

export default App
