import React from 'react'
import './App.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SignOut, SignIn, Home } from './components'
import { auth } from './services/firebase'

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header>
        <h1>Fire Chatter</h1>
        <SignOut />
      </header>

      {user ? <Home /> : <SignIn />}
    </div>
  )
}

export default App
