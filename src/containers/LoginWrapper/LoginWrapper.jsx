import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import { auth } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function LoginWrapper() {
  const LoginWrapperWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const LoginWrapperWithGithub = () => {
    const provider = new GithubAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <section className="flex flex-col gap-10 p-5">
      <header className="flex justify-center text-4xl">Fire Chatter</header>
      <main className="flex flex-col md:flex-row items-center justify-center gap-3">
        <button className="flex items-center gap-3 hover:border-none border-none hover:bg-btnHover" onClick={LoginWrapperWithGoogle}>
          <FcGoogle size={30} />
          Sign in with Google
        </button>
        <button className="flex items-center gap-3 hover:border-none border-none hover:bg-btnHover" onClick={LoginWrapperWithGithub}>
          <AiFillGithub size={30} />
          Sign in with GitHub
        </button>
      </main>
      <footer className="text-black italic opacity-50">Do not violate the community guidelines or you will be banned for life!</footer>
    </section>
  )
}

export default WithCard(LoginWrapper)
