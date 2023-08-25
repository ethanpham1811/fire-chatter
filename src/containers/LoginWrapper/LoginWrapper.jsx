import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import { AUTHEN_PROVIDERS } from '../../constants/enum'
import { addUser, auth } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function LoginWrapper() {
  const loginWithProvider = async (prov) => {
    const provider = prov === AUTHEN_PROVIDERS.GOOGLE ? new GoogleAuthProvider() : new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)
    /* create new user */
    addUser(result.user)
  }

  return (
    <section className="flex flex-col gap-10 p-10">
      <header className="flex justify-center text-4xl">Fire Chatter</header>
      <main className="flex flex-col md:flex-row items-center justify-center gap-3">
        <button
          className="flex items-center gap-3 hover:border-none border-none hover:bg-btnHover"
          onClick={() => loginWithProvider(AUTHEN_PROVIDERS.GOOGLE)}
        >
          <FcGoogle size={30} />
          Sign in with Google
        </button>
        <button
          className="flex items-center gap-3 hover:border-none border-none hover:bg-btnHover"
          onClick={() => loginWithProvider(AUTHEN_PROVIDERS.GOOGLE)}
        >
          <AiFillGithub size={30} />
          Sign in with GitHub
        </button>
      </main>
      <footer className="text-black italic opacity-50 text-center">Do not violate the community guidelines or you will be banned for life!</footer>
    </section>
  )
}

export default WithCard(LoginWrapper)
