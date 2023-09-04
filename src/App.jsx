import React, { useMemo, useState } from 'react'

import { AnimatePresence } from 'framer-motion'
import { FriendRequestWindow, NoFriendWindow, NotificationBoard } from './components'
import { CARD_TITLE, COMPONENT_KEYS, FRIEND_STATUSES, cardAnimation } from './constants/enum'
import { ChatBoxWrapper, ContactsWrapper, LoginWrapper, ProfileWrapper } from './containers'
import AppContext from './contexts/AppContext'
import { useInitApp, useIsMobile, useSelectedUser } from './hooks'
import { auth } from './services/firebase'

function App() {
  const [isMobile] = useIsMobile()
  const [authUser, me, isMounted, isLoading] = useInitApp()
  const [selectedUser, setSelectedUser, setSelectedFsId] = useSelectedUser(me?.uid)
  const [activeCard, setActiveCard] = useState(CARD_TITLE.CONTACTS)

  /* useMemo for Context object */
  const contexts = useMemo(() => {
    return { isMobile, isMounted, me, setSelectedFsId, setSelectedUser, setActiveCard }
  }, [isMobile, isMounted, me, setSelectedFsId, setSelectedUser, setActiveCard])

  return (
    <AppContext.Provider value={contexts}>
      <div className="flex flex-row items-center justify-center h-screen w-screen bg-mainColor gap-16 max-w-full">
        {/* login wrapper */}
        {!authUser && !isLoading && <LoginWrapper auth={auth} anim={cardAnimation.login} key={COMPONENT_KEYS.LOGIN} />}

        {/* after login */}
        {authUser && (
          <>
            {(activeCard === CARD_TITLE.CONTACTS || !isMobile || !selectedUser) && (
              <ContactsWrapper cardTitle={CARD_TITLE.CONTACTS} anim={cardAnimation.contacts} key={COMPONENT_KEYS.CONTACTS} />
            )}
            <AnimatePresence exitBeforeEnter initial mode="sync" onExitComplete={() => null}>
              {/* chatbox wrapper: RIGHT PANEL */}
              {selectedUser && (
                <>
                  {activeCard === CARD_TITLE.PROFILE && (
                    <ProfileWrapper
                      user={selectedUser.uid === me.uid ? me : selectedUser}
                      isMe={selectedUser.uid === me.uid}
                      cardTitle={CARD_TITLE.PROFILE}
                      anim={cardAnimation.profile}
                      key={COMPONENT_KEYS.PROFILE}
                    />
                  )}
                  {activeCard === CARD_TITLE.CHATBOX && selectedUser?.friendStatus === FRIEND_STATUSES.ACCEPTED && (
                    <ChatBoxWrapper
                      user={me}
                      friend={selectedUser}
                      cardTitle={CARD_TITLE.CHATBOX}
                      anim={cardAnimation.chatbox}
                      key={COMPONENT_KEYS.CHATBOX}
                    />
                  )}
                  {activeCard === CARD_TITLE.FRIEND_REQUEST && selectedUser?.friendStatus !== FRIEND_STATUSES.ACCEPTED && (
                    <FriendRequestWindow
                      user={me}
                      friend={selectedUser}
                      cardTitle={CARD_TITLE.FRIEND_REQUEST}
                      anim={cardAnimation.profile}
                      key={COMPONENT_KEYS.PROFILE}
                    />
                  )}
                </>
              )}
              {/* selecting no friend window */}
              {activeCard === CARD_TITLE.NOFRIEND && (
                <NoFriendWindow cardTitle={CARD_TITLE.NOFRIEND} anim={cardAnimation.chatbox} key={COMPONENT_KEYS.CHATBOX} />
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      <NotificationBoard />
    </AppContext.Provider>
  )
}

export default App
