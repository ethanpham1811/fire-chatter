import { FRIEND_STATUSES, FRIENDSHIP_ACTION } from '../constants/enum'
import { removeFriendship, setFriendship } from '../services/firebase'

export function handleFriendship(sender, receiver, action, isInit = false) {
  switch (action) {
    case FRIENDSHIP_ACTION.REQUEST:
      setFriendship(sender, receiver, FRIEND_STATUSES.SENT, FRIEND_STATUSES.PENDING)
      break
    case FRIENDSHIP_ACTION.ACCEPT:
      setFriendship(sender, receiver, FRIEND_STATUSES.ACCEPTED, FRIEND_STATUSES.ACCEPTED, isInit)
      break
    case FRIENDSHIP_ACTION.REMOVE:
      removeFriendship(sender.uid, receiver.uid)
      break
  }
}

export function timeout(duration) {
  return new Promise((res) => setTimeout(res, duration))
}

export const handleEnter = (e, cb) => (e.key === 'Enter' || e.keyCode === 13) && cb()
export const getFirstWord = (str) => str.trimLeft().split(' ')[0]
