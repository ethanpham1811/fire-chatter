import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'

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

/* UserList: users */
export const fetchUsers = async (userQuery, userId) => {
  const dbRef = collection(db, 'users')
  const qName = query(dbRef, where('displayName', '>=', userQuery), where('displayName', '<=', userQuery + '\uf8ff'))
  const qEmail = query(dbRef, where('email', '>=', userQuery), where('email', '<=', userQuery + '\uf8ff'))
  const [snap1, snap2] = await Promise.all([getDocs(qName), getDocs(qEmail)])
  const res1 = snap1.docs.map((doc) => doc.data())
  const res2 = snap2.docs.map((doc) => doc.data())
  console.log(res1, res2, userQuery)
  return [...res1, ...res2].filter((user) => user.uid !== userId)
}
export const fetchUserDetail = async (userId) => {
  const dbRef = collection(db, 'users')
  const q = query(dbRef, where('uid', '==', userId))
  const snap = await getDocs(q)
  return snap.docs[0].data()
}
export const addUser = async ({ displayName, email, photoURL, uid }) => {
  const data = {
    displayName,
    email,
    photoUrl: photoURL,
    uid
  }
  return await setDoc(doc(db, 'users', uid), data)
}
export const editUser = async (props, userId) => {
  const dbRef = doc(db, 'users', userId)
  return await updateDoc(dbRef, props)
}
export const subscribeToUsers = (userId, cb) => {
  const dbRef = doc(db, 'users', userId)
  const unsubscribe = onSnapshot(dbRef, (snap) => cb(snap.data()))
  return unsubscribe
}

/* Friendlist: friends */
export const fetchFriendList = async (userId) => {
  const dbRef = collection(db, 'users', userId, 'friends')
  const snap = await getDocs(dbRef)
  return snap.docs.map((doc) => doc.data())
}

/* Conversation */
export const getConversationId = async (userId, friendId) => {
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

/* Messages: privateMessages */
export const subscribeToMessages = (conversationId, cb) => {
  const dbRef = collection(db, 'privateMessages', conversationId ?? '_', 'messages')
  const q = query(dbRef, orderBy('timestamp', 'asc'))
  const unsubscribe = onSnapshot(q, (snap) => cb(snap.docs.map((doc) => doc.data())))
  return unsubscribe
}

export const sendMessage = async (conversationId, sender, receiver, content, photoUrl, uploads) => {
  const data = {
    sender,
    receiver,
    content,
    photoUrl: photoUrl ?? '',
    timestamp: serverTimestamp(),
    uploads
  }
  return await addDoc(collection(db, 'privateMessages', conversationId, 'messages'), data)
}
