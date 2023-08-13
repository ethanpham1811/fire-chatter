import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBtG3j9bUmn49hTnnfrZM0vzsVhCOq6tks',
  authDomain: 'fire-chatter-b2e87.firebaseapp.com',
  projectId: 'fire-chatter-b2e87',
  storageBucket: 'fire-chatter-b2e87.appspot.com',
  messagingSenderId: '535493657925',
  appId: '1:535493657925:web:7f74a2d87e6eb8092c2a2c'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// authentication
export const auth = getAuth(app)

// console.log(auth)
// console.log(db)

/* Friendlist */
export const fetchFriendList = async (userId) => {
  const dbRef = collection(db, 'users', userId, 'friends')
  const snap = await getDocs(dbRef)
  return snap.docs.map((doc) => doc.data())
}

/* Messages */
export const retrieveConversationId = async (userId, friendId) => {
  console.log(userId, friendId)
  const pairIds = [userId, friendId]
  const dbRef = collection(db, 'privateMessages').where('user1Id', 'in', pairIds).where('user2Id', 'in', pairIds)
  const snap = await getDocs(dbRef)
  console.log(snap.docs[0].data())
  return snap.docs[0].data()
}

export const fetchMessages = async (conversationId) => {
  const msgRef = collection('privateMessages').doc(conversationId).collection('messages').orderBy('timestamp')
  const snapshot = await msgRef.get()
  return snapshot?.docs[0].data() || null
}

export const sendMessage = (userId, friendId, message) => {
  const messageData = {
    sender: userId,
    receiver: friendId,
    content: message,
    timestamp: ' firebase.firestore.FieldValue.serverTimestamp()'
  }
  const conversationRef = collection('privateMessages').doc(userId).collection('conversations').doc(friendId)
  const messagesRef = conversationRef.collection('messages')
  return messagesRef.add(messageData)
}
