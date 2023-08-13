import React from 'react'
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'

import './SignIn.scss'

function SignIn({ auth }) {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <button className="sign-in" onClick={signInWithGithub}>
        Sign in with GitHub
      </button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

export default SignIn
