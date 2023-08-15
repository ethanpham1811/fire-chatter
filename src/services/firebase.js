import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, getDocs, where, query, addDoc, serverTimestamp, onSnapshot, orderBy } from 'firebase/firestore'

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

/* Friendlist */
export const fetchFriendList = async (userId) => {
  const dbRef = collection(db, 'users', userId, 'friends')
  const snap = await getDocs(dbRef)
  return snap.docs.map((doc) => doc.data())
}

/* Conversation */
export const getConversationId = async (userId, friendId) => {
  console.log(friendId)
  const pairIds = [userId, friendId]
  const dbRef = collection(db, 'privateMessages')
  const q = query(dbRef, where('user1Id', 'in', pairIds), where('user2Id', 'in', pairIds))
  const snap = await getDocs(q)

  return snap.docs[0] ? snap.docs[0].id : createNewConversation(userId, friendId)
}
export const createNewConversation = async (userId, friendId) => {
  const dbRef = collection(db, 'privateMessages')
  const newConversationDocRef = await addDoc(dbRef, {
    user1Id: userId,
    user2Id: friendId
  })
  return newConversationDocRef.id
}

/* Messages */
export const subscribeToMessages = (conversationId, cb) => {
  const dbRef = collection(db, 'privateMessages', conversationId ?? '_', 'messages')
  const q = query(dbRef, orderBy('timestamp', 'asc'))
  const unsubscribe = onSnapshot(q, (snap) => {
    const messages = snap.docs.map((doc) => doc.data())
    cb(messages)
  })
  return unsubscribe
}

export const sendMessage = async (conversationId, sender, receiver, content, photoUrl) => {
  const data = {
    sender,
    receiver,
    content,
    photoUrl: photoUrl ?? '',
    timestamp: serverTimestamp()
  }
  const a = await addDoc(collection(db, 'privateMessages', conversationId, 'messages'), data)
  return a
}
