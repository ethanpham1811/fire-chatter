import { GithubAuthProvider, GoogleAuthProvider, getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { AiFillGithub, FaArrowRight, FcGoogle } from '../../utils/icons'

import { AUTHEN_PROVIDERS, FRIENDSHIP_ACTION, adminId, newUser } from '../../constants/enum'
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

  const loginWithCredentials = () => {
    signInWithEmailAndPassword(auth, 'test_account@gmail.com', '123123')
  }

  return (
    <section className="flex flex-col gap-5 p-14 w-screen h-screen xs:w-[450px] xs:h-auto justify-center">
      <div className="flex flex-col gap-7 xs:gap-4">
        <header className="text-4xl text-center xs:text-left">
          Welcome to <span className="text-red-600">Fire Chatter!</span>
        </header>

        <main className="flex flex-col xs:flex-row items-center gap-3">
          {/* provider login buttons */}
          <div className="flex gap-3">
            <button
              className="flex items-center p-2 bg-slate-100 rounded-full hover:border-none border-none hover:bg-gray-200"
              onClick={() => loginWithProvider(AUTHEN_PROVIDERS.GOOGLE)}
            >
              <FcGoogle size={30} />
            </button>
            <button
              className="flex items-center p-2 bg-slate-100 rounded-full hover:border-none border-none hover:bg-gray-200"
              onClick={() => loginWithProvider(AUTHEN_PROVIDERS.GOOGLE)}
            >
              <AiFillGithub size={30} />
            </button>
          </div>

          {/* Guest login link */}
          <button
            onClick={loginWithCredentials}
            className="flex bg-transparent xs:bg-slate-100 hover:bg-gray-200 items-center gap-2 w-max py-3 rounded-full font-semibold"
          >
            Fast login with guest account <FaArrowRight className="text-blue-500" />
          </button>
        </main>
        {/* <footer className="text-black italic opacity-50 text-center">{translatedText.loginNote}</footer> */}
      </div>
    </section>
  )
}

export default WithCard(LoginWrapper)
