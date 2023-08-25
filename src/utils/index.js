import { FRIEND_STATUSES, FRIENSHIP_ACTION } from '../constants/enum'
import { removeFriend, setFriendship } from '../services/firebase'

export function handleFrienship(me, friend, action) {
  switch (action) {
    case FRIENSHIP_ACTION.REQUEST:
      setFriendship(friend, me.uid, FRIEND_STATUSES.SENT)
      setFriendship(me, friend.uid, FRIEND_STATUSES.PENDING)
      break
    case FRIENSHIP_ACTION.ACCEPT:
      setFriendship(friend, me.uid, FRIEND_STATUSES.ACCEPTED)
      setFriendship(me, friend.uid, FRIEND_STATUSES.ACCEPTED)
      break
    case FRIENSHIP_ACTION.REMOVE:
      removeFriend(friend.uid, me.uid)
      removeFriend(me.uid, friend.uid)
      break
  }
}

export function timeout(duration) {
  return new Promise((res) => setTimeout(res, duration))
}
