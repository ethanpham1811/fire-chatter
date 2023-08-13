import React from 'react'

import './SignOut.scss'
import { auth } from '../../services/firebase'

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  )
}

export default SignOut
