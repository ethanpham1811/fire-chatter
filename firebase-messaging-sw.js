importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: 'AIzaSyBtG3j9bUmn49hTnnfrZM0vzsVhCOq6tks',
  authDomain: 'fire-chatter-b2e87.firebaseapp.com',
  projectId: 'fire-chatter-b2e87',
  storageBucket: 'fire-chatter-b2e87.appspot.com',
  messagingSenderId: '535493657925',
  appId: '1:535493657925:web:7f74a2d87e6eb8092c2a2c',
  measurementId: 'G-69N1CMMCPG'
}

// const firebaseConfig = event.data.config
const firebaseApp = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging(firebaseApp)

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'CONFIG') {
//     const firebaseConfig = event.data.config
//     const firebaseApp = firebase.initializeApp(firebaseConfig)
//     const messaging = firebase.messaging(firebaseApp)
//     // Add your messaging event listeners and other logic
//     // ...
//   }
// })
