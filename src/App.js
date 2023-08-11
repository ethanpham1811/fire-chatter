import React from 'react'
import './App.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyBtG3j9bUmn49hTnnfrZM0vzsVhCOq6tks',
  authDomain: 'fire-chatter-b2e87.firebaseapp.com',
  projectId: 'fire-chatter-b2e87',
  storageBucket: 'fire-chatter-b2e87.appspot.com',
  messagingSenderId: '535493657925',
  appId: '1:535493657925:web:7f74a2d87e6eb8092c2a2c'
})

const firestore = firebase.firestore()
const auth = firebase.auth()

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header></header>
      <section>{user && <div />}</section>
    </div>
  )
}

export default App
