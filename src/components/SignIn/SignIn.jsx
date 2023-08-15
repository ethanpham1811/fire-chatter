import React from 'react'
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'

import { auth } from '../../services/firebase'
import WithCard from '../../wrappers/WithCard/WithCard'

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <section className="flex flex-col gap-10">
      <header className="flex justify-center text-4xl">Fire Chatter</header>
      <main className="flex items-center justify-center w-[30vw] gap-3">
        <button className="flex items-center gap-3 hover:border-none border-none hover:bg-btnHover" onClick={signInWithGoogle}>
          <FcGoogle size={30} />
          Sign in with Google
        </button>
        <button className="flex items-center gap-3 hover:border-none border-none hover:bg-btnHover" onClick={signInWithGithub}>
          <AiFillGithub size={30} />
          Sign in with GitHub
        </button>
      </main>
      <footer className="text-black italic opacity-50">Do not violate the community guidelines or you will be banned for life!</footer>
    </section>
  )
}

export default WithCard(SignIn)
