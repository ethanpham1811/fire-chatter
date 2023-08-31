import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
import { FRIEND_STATUSES } from '../constants/enum'
import { firebaseConfig } from './firebaseconfig'

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
const db = getFirestore(app)

// authentication
export const auth = getAuth(app)

/* -----------------------------API REQUEST ------------------------------------ */
//---------------------------------------------------------------------------------
//-----------------------------UserList: users ------------------------------------
//---------------------------------------------------------------------------------

export const fetchUsers = async (userQuery, userId) => {
  const dbRef = collection(db, 'users')
  const qName = query(dbRef, where('displayName', '>=', userQuery), where('displayName', '<=', userQuery + '\uf8ff'))
  const qEmail = query(dbRef, where('email', '>=', userQuery), where('email', '<=', userQuery + '\uf8ff'))
  const [snap1, snap2] = await Promise.all([getDocs(qName), getDocs(qEmail)])
  const res1 = snap1.docs.map((doc) => doc.data())
  const res2 = snap2.docs.map((doc) => doc.data())
  return [...res1, ...res2].filter((user) => user.uid !== userId)
}
export const fetchUserDetail = async (userId) => {
  const dbRef = collection(db, 'users')
  const q = query(dbRef, where('uid', '==', userId))
  const snap = await getDocs(q)
  return snap.docs[0]?.data()
}
export const addUser = async ({ displayName, photoURL, uid }) => {
  const data = {
    status: 'active',
    displayName,
    photoUrl: photoURL,
    uid,
    position: 'Jr.',
    about: 'N/A',
    email: 'N/A',
    location: 'N/A',
    phone: 'N/A',
    connections: 0,
    views: 0,
    recs: 0
  }
  return await setDoc(doc(db, 'users', uid), data)
}
export const editUser = async (user) => {
  const userRef = doc(db, 'users', user.uid)
  updateDoc(userRef, user)

  /* update friendships collection with new user data  */
  const fsRef = collection(db, 'friendships')
  const snap = await getDocs(fsRef)
  const userFriendships = snap.docs.filter((doc) => doc.id.includes(user.uid))
  // update sender/receiver obj for each friendship (by id)
  userFriendships.forEach((fs) => {
    const isSender = fs.id.indexOf(user.uid) === 0
    const friendStatus = fs.data()[isSender ? 'sender' : 'receiver']?.friendStatus
    const updatedInfo = { ...user, friendStatus, friendshipId: fs.id }
    updateDoc(doc(db, 'friendships', fs.id), isSender ? { sender: updatedInfo } : { receiver: updatedInfo })
  })
}

export const subscribeToUser = (userId, cb) => {
  const dbRef = doc(db, 'users', userId)
  const unsubscribe = onSnapshot(dbRef, (snap) => cb(snap.data()))
  return unsubscribe
}

//--------------------------------------------------------------------------------------
//----------------------------- Friendlist: friends ------------------------------------
//--------------------------------------------------------------------------------------
export const fetchFriendshipDetail = async (myId, userId) => {
  const dbRef = doc(db, 'users', myId, 'friends', userId)
  const snap = await getDoc(dbRef)
  return snap.data()
}
export const setFriendship = async (sender, receiver, senderStatus, receiverStatus) => {
  const friendshipId = `${sender.uid}_${receiver.uid}`
  const data = {
    sender: { ...sender, friendStatus: senderStatus, friendshipId },
    receiver: { ...receiver, friendStatus: receiverStatus, friendshipId }
  }
  const dbRef = doc(db, 'friendships', `${sender.uid}_${receiver.uid}`)
  return senderStatus === FRIEND_STATUSES.SENT ? await setDoc(dbRef, data) : await updateDoc(dbRef, data)
}
export const removeFriendship = async (myId, friendId) => {
  const friendshipId = await getFriendshipId(myId, friendId)
  const dbRef = doc(db, 'friendships', friendshipId)
  return await deleteDoc(dbRef)
}
export const getFriendshipId = async (userId, friendId) => {
  const dbRef = collection(db, 'friendships')
  const snap = await getDocs(dbRef)
  const datas = snap.docs.map((doc) => doc.id)
  return datas.find((id) => id.includes(userId) && id.includes(friendId))
}
export const subscribeToFriendshipList = async (userId, cb) => {
  const dbRef = collection(db, 'friendships')
  const unsubscribe = onSnapshot(dbRef, (snap) => {
    const userFriendships = snap.docs.filter((doc) => doc.id.includes(userId))
    return cb(userFriendships.map((doc) => doc.data()))
  })
  return unsubscribe
}
export const subscribeToFriendship = (friendshipId, cb) => {
  const dbRef = doc(db, 'friendships', friendshipId)
  const unsubscribe = onSnapshot(dbRef, (snap) => cb(snap.data()))
  return unsubscribe
}

//--------------------------------------------------------------------------------------
//----------------------------- Conversation -------------------------------------------
//--------------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------------
//----------------------------- Messages: privateMessages  -----------------------------
//--------------------------------------------------------------------------------------
export const subscribeToMessages = (conversationId, cb) => {
  const dbRef = collection(db, 'privateMessages', conversationId ?? '_', 'messages')
  const q = query(dbRef, orderBy('timestamp', 'asc'))
  const unsubscribe = onSnapshot(q, (snap) => cb(snap.docs.map((doc) => doc.data())))
  return unsubscribe
}

export const sendMessage = async (conversationId, sender, receiver, content, uploads, senderName) => {
  const data = {
    sender,
    receiver,
    content,
    timestamp: serverTimestamp(),
    uploads,
    senderName
  }
  return await addDoc(collection(db, 'privateMessages', conversationId, 'messages'), data)
}
