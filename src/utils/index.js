import { FRIEND_STATUSES, FRIENDSHIP_ACTION } from '../constants/enum'
import { removeFriendship, setFriendship } from '../services/firebase'

export function handleFriendship(sender, receiver, action) {
  switch (action) {
    case FRIENDSHIP_ACTION.REQUEST:
      setFriendship(sender, receiver, FRIEND_STATUSES.PENDING)
      break
    case FRIENDSHIP_ACTION.ACCEPT:
      setFriendship(sender, receiver, FRIEND_STATUSES.ACCEPTED)
      break
    case FRIENDSHIP_ACTION.REMOVE:
      removeFriendship(sender.uid, receiver.uid)
      break
  }
}

export function timeout(duration) {
  return new Promise((res) => setTimeout(res, duration))
}

export const handleEnter = (e, cb) => e.key === 'Enter' && cb()
export const getFirstWord = (str) => str.trimLeft().split(' ')[0]
