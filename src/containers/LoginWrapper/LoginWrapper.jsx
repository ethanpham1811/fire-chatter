import { GithubAuthProvider, GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { AiFillGithub, FcGoogle } from '../../utils/icons'

import { AUTHEN_PROVIDERS, FRIENDSHIP_ACTION, adminId, newUser, translatedText } from '../../constants/enum'
import { addUser, auth, fetchUserDetail } from '../../services/firebase'
import { handleFriendship } from '../../utils'
import WithCard from '../../wrappers/WithCard/WithCard'

function LoginWrapper() {
  const loginWithProvider = (prov) => {
    const provider = prov === AUTHEN_PROVIDERS.GOOGLE ? new GoogleAuthProvider() : new GithubAuthProvider()

    signInWithPopup(auth, provider).then(async (result) => {
      const info = getAdditionalUserInfo(result)
      const isNewUser = info.isNewUser

      if (!isNewUser) return

      const user = result.user
      /* create new user */
      addUser(user)

      /* enforce new user to add Ethan (admin) as friend */
      const admin = await fetchUserDetail(adminId)
      const userObj = {
        ...newUser,
        uid: user.uid,
        photoUrl: user.photoURL,
        displayName: user.displayName,
        email: user.email,
        phone: user.phoneNumber
      }
      handleFriendship(admin, userObj, FRIENDSHIP_ACTION.ACCEPT, true)
    })
  }

  return (
    <section className="flex flex-col gap-5 p-14 w-[80vw] xs:w-[70vw] xl:w-[35vw] xs:max-h-[70vh]">
      <div className="flex flex-col gap-10">
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
        <footer className="text-black italic opacity-50 text-center">{translatedText.loginNote}</footer>
      </div>
    </section>
  )
}

export default WithCard(LoginWrapper)
