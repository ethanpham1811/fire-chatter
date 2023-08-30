import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { app } from './firebase'
import { firebaseConfig } from './firebaseconfig'

const { VITE_FIRE_VAP_IDKEY, VITE_FIRE_OATH, VITE_FIRE_PROJID } = import.meta.env

// Initialize
const messaging = getMessaging(app)

/* Initialize Firebase messaging */
export const getMessagingToken = async () => await getToken(messaging, { vapidKey: VITE_FIRE_VAP_IDKEY })

export function requestPermission() {
  Notification.requestPermission()
}

/* send notification request */
export const sendNotification = (receiverToken, data) => {
  const serverEndpoint = `https://fcm.googleapis.com/v1/projects/${VITE_FIRE_PROJID}/messages:send` // Replace with the actual FCM endpoint
  const payload = {
    message: {
      token: receiverToken,
      notification: {
        title: data.userName,
        body: data.message
      },
      webpush: {
        headers: {
          Urgency: 'high'
        },
        notification: {
          body: data.message,
          requireInteraction: true,
          badge: data.photoUrl
        }
      }
    }
  }

  fetch(serverEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${VITE_FIRE_OATH}` // Replace with your actual FCM access token
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('FCM Message sent:', responseData)
    })
    .catch((error) => {
      console.error('Error sending FCM message:', error)
    })
}

/* listener */
export const msgNotificationListener = (cb) =>
  onMessage(getMessaging(), (payload) => {
    cb(payload)
  })

/* send firebase config to service worker */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      // Pass Firebase configuration to the service worker
      registration.active.postMessage({ type: 'CONFIG', config: firebaseConfig })
      // console.log('successfully pass config')
    })
    .catch((error) => {
      // console.error('Service worker registration failed:', error)
    })
}
